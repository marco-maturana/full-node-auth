import {userResolver, userSchema} from "@graphql/user";

export const typeDefs = [
  userSchema
]

export const resolvers = {
  ...userResolver
}