const { saltHashPassword } = require('./../models/users');

exports.up = (knex, Promise) => {
  const convertPassword = (user) => {
    const { salt, hash } = saltHashPassword(user.password);
    return knex('users')
      .where({ id: user.id })
      .update({
        salt,
        encryptedPassword: hash,
      });
  };
  return knex.schema
    .table('users', (t) => {
      t.string('salt').notNullable();
      t.string('encryptedPassword').notNullable();
    })
    .then(() => knex('users'))
    .then(users => Promise.all(users.map(convertPassword)))
    .then(() => knex.schema.table('users', (t) => {
      t.dropColumn('password');
    }));
};

exports.down = knex => knex.schema.table('users', (t) => {
  t.dropColumn('salt');
  t.dropColumn('encrypted_password');
  t.string('password').notNullable();
});
