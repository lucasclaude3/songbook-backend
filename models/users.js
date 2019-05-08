const crypto = require('crypto');
const knex = require('knex')(require('./../knexfile'));

function checkUsername(username) {
  return knex('users')
    .where('username', username);
}

async function insert(username, salt, hash) {
  return knex('users')
    .insert({
      username,
      salt,
      encryptedPassword: hash,
    })
    .returning('id');
}

function randomString() {
  return crypto.randomBytes(4).toString('hex');
}

function saltHashPassword(password, salt = randomString()) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password);
  return {
    salt,
    hash: hash.digest('hex'),
  };
}

exports.saltHashPassword = saltHashPassword;

exports.list = () => knex('users');

exports.get = id => knex('users')
  .where('id', id);

exports.create = (username, password) => checkUsername(username)
  .then((result) => {
    if (result.length > 0) {
      return Promise.reject(new Error('Username already taken'));
    }
    return Promise.resolve();
  })
  .then(async () => {
    const { salt, hash } = saltHashPassword(password);
    return insert(username, salt, hash)
      .then(([userId]) => this.get(userId));
  });

exports.delete = id => knex('users')
  .where('id', id)
  .del();
