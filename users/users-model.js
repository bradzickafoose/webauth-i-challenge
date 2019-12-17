const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findUser,
};

function add(user) {
  return db('users').insert(user, 'id');
}

function find() {
  return db('users');
}

function findUser(username) {
  return db('users').where(username);
}
