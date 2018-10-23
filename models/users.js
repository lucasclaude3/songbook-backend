var knex = require('knex')(require('./../knexfile'));
var crypto = require('crypto');

exports.list = function() {
    return knex('users');
}

exports.get = function(id) {
    return knex('users')
        .where('id', id);
}

exports.create = function(username, password) {
    console.log(password);
    const { salt, hash } = saltHashPassword(password)
    return knex('users')
        .insert({
            username: username,
            salt: salt,
            encryptedPassword: hash
        });
}

exports.delete = function(id) {
    return knex('users')
        .where('id', id)
        .del();
}

function saltHashPassword(password, salt = randomString()) {
    const hash = crypto
      .createHmac('sha512', salt)
      .update(password)
    return {
      salt,
      hash: hash.digest('hex')
    }
}

exports.saltHashPassword = saltHashPassword;

function randomString () {
    return crypto.randomBytes(4).toString('hex')
}