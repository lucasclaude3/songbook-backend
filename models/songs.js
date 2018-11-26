var knex = require('knex')(require('./../knexfile'));

exports.list = function() {
    return knex('songs');
}

exports.get = function(id) {
    return knex('songs')
        .where('id', id);
}

exports.create = function(userId, songName, artistName, lyrics, chords) {
    return knex('songs')
        .insert({
            userId: userId,
            songName: songName,
            artistName: artistName,
            lyrics: lyrics,
            chords: chords
        });
}

exports.delete = function(id) {
    return knex('songs')
        .where('id', id)
        .del();
}