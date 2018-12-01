const knex = require('knex')(require('./../knexfile'));

exports.list = () => knex('songs');

exports.get = id => knex('songs')
  .where('id', id);

exports.create = (userId, songName, artistName, lyrics, chords) => knex('songs')
  .insert({
    userId,
    songName,
    artistName,
    lyrics,
    chords,
  });

exports.delete = id => knex('songs')
  .where('id', id)
  .del();
