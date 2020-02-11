import { OAuth2Client } from 'google-auth-library';
import {StrategyResult} from '.';

export default async function verifyToken(token: string): Promise<StrategyResult | null> {
  if (process.env.GOOGLE_CLIENT_ID == null) throw new Error('GOOGLE_CLIENT_ID needs to be defined!');

  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (payload == null) return null;

  return {
    name: payload.name,
    email: payload.email,
    image: payload.picture,
  };
}
