import {oauth, generateToken} from '@services/auth';

// TODO (marco) - Add fields validation
const login = async (_parent: any, args: any) => {
  const {token, strategy} = args;

  const user = await oauth({token, strategy});

  return {
    name: user.name,
    email: user.email,
    picute: user.picture,
    token: generateToken(user),
  }
}

export default {
  Query: {login}
}