const { saltHashPassword } = require('./../models/users');

exports.up = function (knex, Promise) {
    return knex.schema
      .table('users', t => {
        t.string('salt').notNullable()
        t.string('encryptedPassword').notNullable()
      })
      .then(() => knex('users'))
      .then(users => Promise.all(users.map(convertPassword)))
      .then(() => {
        return knex.schema.table('users', t => {
          t.dropColumn('password')
        })
      });

    function convertPassword (user) {
      const { salt, hash } = saltHashPassword(user.password)
      return knex('users')
        .where({ id: user.id })
        .update({
          salt,
          encryptedPassword: hash
        })
    }
  }
  exports.down = function (knex, Promise) {
    return knex.schema.table('users', t => {
      t.dropColumn('salt')
      t.dropColumn('encrypted_password')
      t.string('password').notNullable()
    })
  }
