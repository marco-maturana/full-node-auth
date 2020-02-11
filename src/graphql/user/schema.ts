import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    picture: String
  }

  type UserAuth {
    name: String!
    email: String!
    picture: String
  }

  type AuthResponse {
    user: UserAuth!
    token: String!
  }

  enum Strategy {
    google
  }

  type Query {
    login(token: String!, strategy: Strategy!): AuthResponse!
  }
`