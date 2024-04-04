const User = require('./User');
const Song = require('./Song');
const SongLib = require('./SongLib');
const Playlist = require('./Playlist');

Playlist.hasMany(Song, {
  foreignKey: 'playlist_id',
});

Playlist.hasMany(SongLib, {
  foreignKey: 'playlist_id',
});

Song.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
});

SongLib.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
});

User.hasMany(Playlist, {
  foreignKey: 'user_id',
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = {User, Song, SongLib, Playlist};