const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model{};

Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    song_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'playlist',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'song',
  },
);

module.exports = Song;