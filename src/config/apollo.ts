import { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import User, { IUser } from '@models/user';
import { verifyToken } from '@services/auth';
import { typeDefs, resolvers, schemaDirectives } from '@graphql/index';

export interface ApolloContext {
  req: Request;
  res: Response;
  user: IUser;
}

const context = async ({req, res}: {req: Request, res: Response}) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (token != null) {
      const decoded = verifyToken(token);

      const user = await User.findById(decoded.sub);

      if (user != null) return {req, res, user};
    }
  }

  return {req, res};
}

export default new ApolloServer({ context, typeDefs, resolvers, schemaDirectives });