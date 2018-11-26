
exports.up = function(knex, Promise) {
    return knex.schema.createTable('songs', function (t) {
        t.increments('id').primary();
        t.integer('userId').unsigned().notNullable();
        t.string('songName').notNullable();
        t.string('artistName').notNullable();
        t.text('lyrics');
        t.text('chords');
        t.timestamps(false, true);
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('songs');
};
