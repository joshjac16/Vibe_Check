const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Playlist, Song, User, SongLib } = require('../models');

router.get('/', async (req, res) => {
  try {
    //   const dbPlaylistData = await Playlist.findAll({
    //     include: [
    //       {
    //         model: Song,
    //         attributes: ['song', 'artist', 'album', 'rating'],
    //       },
    //     ],
    //   });

    //   const playlists = dbPlaylistData.map((playlist) =>
    //     playlist.get({ plain: true })
    //   );

    const dbSongData = await SongLib.findAll({
      attributes: ['song', 'artist', 'album', 'rating'],
      order: [['rating', 'DESC']],
      limit: 10,
    });

    const songs = dbSongData.map((song) => song.get({ plain: true }));

    const userData = await User.findByPk(req.session.userId, {
      attributes: ['username'],
    });

    const username = userData ? userData.username : '';

    const dbPlaylistData = await Playlist.findAll({
      order: [['rating', 'DESC']],
      limit: 10,
    });
    const playlists = dbPlaylistData.map((playlist) =>
      playlist.get({ plain: true })
    );

    res.render('homepage', {
      // playlists,
      songs: songs,
      username: username,
      playlists: playlists,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/playlists', withAuth, async (req, res) => {
  try {
    const dbPlaylistData = await Playlist.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const dbUserName = await User.findByPk(req.session.userId);

    const playlists = dbPlaylistData.map((playlists) =>
      playlists.get({ plain: true })
    );

    res.render('homepage', {
      userName: dbUserName.username,
      playlists,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/playlist/:id', withAuth, async (req, res) => {
  try {
    const dbPlaylistData = await Song.findAll({
      where: {
        playlist_id: req.params.id,
      },
    });
    const dbPlaylistName = await Playlist.findByPk(req.params.id);
    console.log(typeof dbPlaylistData, dbPlaylistData);
    // creates a false boolean result for the creator of the playlist, then checks if the creator of theplayist's id matches the currently logged in user. If yes, then the user will be able to edit or delete the playlist.
    let isCreator = false;
    if (req.session.userId === dbPlaylistName.user_id) {
      isCreator = true;
    }
    const playlist = dbPlaylistData.map((playlist) =>
      playlist.get({ plain: true })
    );
    console.log(playlist);

    res.render('playlist', {
      playlist,
      isCreator,
      playlistTitle: dbPlaylistName.title,
      playlistId: dbPlaylistName.id,
      playlistRating: dbPlaylistName.rating,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  res.render('login');
});

module.exports = router;
