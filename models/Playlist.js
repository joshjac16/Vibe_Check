const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Playlist extends Model{};

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'playlist',
  }
);

module.exports = Playlist;