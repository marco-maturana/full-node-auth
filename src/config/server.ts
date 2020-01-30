import express from 'express';

const server = express();

const APP_PORT = process.env.NODE_ENV || 8000;

server.get('/api', (_req, res) => res.json({message: 'ok'}));

export default server.listen(APP_PORT, () => {
  console.log(`O Servidor esta executando na porta ${APP_PORT}!`);
});