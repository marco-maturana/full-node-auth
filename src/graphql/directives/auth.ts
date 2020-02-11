import {gql, SchemaDirectiveVisitor, AuthenticationError} from 'apollo-server-express';
import {GraphQLField, GraphQLObjectType, defaultFieldResolver} from 'graphql'

export const authTypeDef = gql`
  directive @auth on OBJECT | FIELD_DEFINITION
`

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(object: GraphQLObjectType) {
    this.ensureFieldsWrapped(object);
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    this.ensureFieldsWrapped(field);
  }

  ensureFieldsWrapped(field: GraphQLField<any, any> | any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (results: any, args: any, context: any, info: any) {
      if (context == null || context.employee == null) {
        throw new AuthenticationError("Unauthenticated employee!");
      }

      return resolve.apply(this, [results, args, context, info]);
    };
  }
}

