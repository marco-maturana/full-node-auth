import express from 'express';
import apollo from './apollo';

const app = express();

const APP_PORT = process.env.NODE_ENV || 8000;

apollo.applyMiddleware({ app, path: '/graphql' });

app.get('/api', (_req, res) => res.json({message: 'ok'}));

export default app.listen(APP_PORT, () => {
  console.log(`O Servidor esta executando na porta ${APP_PORT}!`);
});