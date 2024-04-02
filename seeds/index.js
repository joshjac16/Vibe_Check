const sequelize = require('../config/connection');
const seedSongs = require('./songData');
const seedPlaylist = require('./playlistData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedSongs();

  await seedPlaylist();

  process.exit(0);
};

seedAll();
