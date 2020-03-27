const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const knex = require('../database/db-config');
const restricted = require("../auth/restricted");

const server = express();

const sessionConfiguration = {
  // session storage options
  name: "peanutbutter", // default would be sid
  secret: "keep it secret, keep it safe!", // used for encryption (must be an environment variable)
  saveUninitialized: true, // has implications with GDPR laws
  resave: false,

  // how to store the sessions
  store: new KnexSessionStore({
    // DO NOT FORGET THE new KEYWORD
    knex, // imported from db-config.js
    createtable: true,
    clearInterval: 1000 * 60 * 10, // defaults to 6000
    sidfieldname: 'sid', // Name it whatever you want. Defaults to 'sid'

    // optional
    tablename: 'sessions', // Name it whatever you want. Defaults to 'sessions'
  }),

  // cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, // session will be good for 10 minutes in milliseconds
    secure: false, // if false the cookie es sent over http, if true only sent over https
    httpOnly: true, // if true JS cannot access the cookie
  },
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfiguration)); // add a req.session object
server.use('/api/', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
  res.status(200).send('Server is online');
});

module.exports = server;
