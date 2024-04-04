const sequelize = require('../config/connection');
const seedSongs = require('./songData');
const seedPlaylist = require('./playlistData');
const seedUser = require('./userData');
const seedSongLib = require('./songLibrary');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPlaylist();

  await seedSongs();

  await seedSongLib();

  process.exit(0);
};

seedAll();
