var knex = require('knex')(require('./../knexfile'));
var crypto = require('crypto');

exports.list = function() {
    return knex('users');
}

exports.get = function(id) {
    return knex('users')
        .where('id', id);
}

function checkUsername(username) {
    return knex('users')
        .where('username', username);
}

exports.create = function(username, password) {
    return checkUsername(username)
        .then(result => {
            console.log(result);
            if (result.length > 0) {
                return Promise.reject(new Error('Username already taken'));
            }
            return;
        })
        .then(() => {
            const { salt, hash } = saltHashPassword(password);
            return knex('users')
                .insert({
                    username: username,
                    salt: salt,
                    encryptedPassword: hash
                });
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
      .update(password);
    return {
      salt,
      hash: hash.digest('hex')
    }
}

exports.saltHashPassword = saltHashPassword;

function randomString () {
    return crypto.randomBytes(4).toString('hex')
}