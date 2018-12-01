
exports.up = knex => knex.schema.createTable('songs', (t) => {
  t.increments('id').primary();
  t.integer('userId').unsigned().notNullable();
  t.string('songName').notNullable();
  t.string('artistName').notNullable();
  t.text('lyrics');
  t.text('chords');
  t.timestamps(false, true);
});

exports.down = knex => knex.schema.dropTableIfExists('songs');
