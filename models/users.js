var knex = require('knex')(require('./../knexfile'));

exports.list = function() {
    return knex('users');
}

exports.get = function(id) {
    return knex('users')
        .where('id', id);
}

exports.create = function(username, password) {
    return knex('users')
        .insert({
            username: username,
            password: password,
        });
}

exports.delete = function(id) {
    knex('users')
        .where('id', id)
        .del();
}