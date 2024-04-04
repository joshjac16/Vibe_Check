const router = require('express').Router();

const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');
const playlistRoutes = require('./playlist-routes');

router.use('/users', userRoutes);
router.use('/song', songRoutes);
router.use('/playlist', playlistRoutes);

module.exports = router;
