import dotenv from 'dotenv';
import express from 'express';
import apollo from './apollo';

const config = dotenv.config();

if (config.error) throw new Error('Could not load the configuration file!');

const app = express();

const APP_PORT = process.env.APP_PORT || 8000;

apollo.applyMiddleware({ app, path: '/graphql' });

app.get('/api', (_req, res) => res.json({message: 'ok'}));

export default app.listen(APP_PORT, () => {
  console.log(`O Servidor esta executando na porta ${APP_PORT}!`);
});