const User = require('./User');
const Song = require('./Song');
const Playlist = require('./Playlist');

Playlist.hasMany(Song, {
  foreignKey: 'playlist_id',
});

Song.belongsTo(Playlist, {
  foreignKey: 'playlist_id',
});

User.hasMany(Playlist, {
  foreignKey: 'user_id',
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = {User, Song, Playlist};