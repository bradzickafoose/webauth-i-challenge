const express = require('express');

const server = express();

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('Server is online');
});

server.use('/api/', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
