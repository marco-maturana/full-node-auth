import {userResolver, userSchema} from "@graphql/user";
import {directivesTypeDef, schemaDirectives} from "@graphql/directives";

export const typeDefs = [
  userSchema,
  ...directivesTypeDef,
]

export const resolvers = {
  ...userResolver
}

export {schemaDirectives};