const knex = require('knex')(require('./../knexfile'));

// COMMON

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
  })
  .returning('id');

exports.delete = id => knex('songs')
  .where('id', id)
  .del();

// USER SPECIFIC

exports.listByUser = userId => knex('songs')
  .where('userId', userId);

exports.getByUser = (userId, songId) => knex('songs')
  .where('userId', userId)
  .where('id', songId);

exports.deleteByUser = (userId, songId) => knex('songs')
  .where('userId', userId)
  .where('id', songId)
  .del();
