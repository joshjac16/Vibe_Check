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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'song',
  }
);

module.exports = Song;