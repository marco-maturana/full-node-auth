import User, {IUser} from '@models/user';
import google from './google';
import jwt from 'jsonwebtoken';

export interface StrategyResult {
  name?: string;
  email?: string;
  image?: string;
}

type StrategyType = 'google' | 'facebook' | 'local';

export async function oauth({token, strategy}: {token: string, strategy: StrategyType}): Promise<IUser> {

  let payload: StrategyResult | null;

  switch(strategy) {
    case 'google':
      payload = await google(token);
      break;
    default: throw new Error('Invalid authentication strategy!');
  }

  if (payload == null) throw new Error('User not authenticated!');

  if (payload.name == null || payload.email == null) {
    throw new Error('Invalid user name or email!');
  }

  const {email, name, image} = payload;

  let user = await User.findOne({email});

  if (user == null) {
    user = await User.create({email, name, image})
  }

  return user;
}

export function generateToken(user: IUser): string {
  if (process.env.JWT_SECRET == null) throw new Error('JWP_SECRET needs to be defined!');

  const {name, email} = user;

  return jwt.sign({name, email}, process.env.JWT_SECRET, {
    subject: user.id,
  });
}

export function verifyToken(token: string) {
  if (process.env.JWT_SECRET == null) throw new Error('JWP_SECRET needs to be defined!');

  let decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (typeof decoded === 'string') return JSON.parse(decoded);

  return decoded;
}
