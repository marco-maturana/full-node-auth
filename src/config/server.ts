import dotenv from 'dotenv';
import express from 'express';
import apollo from '@config/apollo';
import database from '@config/database';
import User from '@models/user';

const config = dotenv.config();

if (config.error) throw new Error('Could not load the configuration file!');

database()

const app = express();

const APP_PORT = process.env.APP_PORT || 8000;

apollo.applyMiddleware({ app, path: '/graphql' });

app.get('/api', (_req, res) => res.json({message: 'ok'}));
app.get('/user', async (_req, res) => {
  const user = await User.create({
    name: 'Marco Aurelio',
    email: 'marco.maturana@gmail.com'
  })

  return res.json(user);
});

export default app.listen(APP_PORT, () => {
  console.log(`O Servidor esta executando na porta ${APP_PORT}!`);
});