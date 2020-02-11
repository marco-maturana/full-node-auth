import {gql, SchemaDirectiveVisitor, AuthenticationError, ForbiddenError} from 'apollo-server-express';
import {GraphQLField, GraphQLObjectType, defaultFieldResolver} from 'graphql'

export const protectTypeDef = gql`
  enum Role {
    admin,
    talent_acquistion,
    technical_evaluator,
  }

  directive @protect(roles: [Role]) on OBJECT | FIELD_DEFINITION
`

export class ProtectDirective extends SchemaDirectiveVisitor {
  visitObject(object: GraphQLObjectType) {
    this.ensureFieldsWrapped(object, this.args);
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    this.ensureFieldsWrapped(field, this.args);
  }

  ensureFieldsWrapped(field: GraphQLField<any, any> | any, fieldArgs: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (results: any, args: any, context: any, info: any) {
      if (context == null || context.user == null) {
        throw new AuthenticationError("Employee user!");
      }

      if (!fieldArgs.roles.includes(context.user.role)) {
        throw new ForbiddenError("Employee not allowed!");
      }

      return resolve.apply(this, [results, args, context, info]);
    };
  }
}
