const router = require('express').Router();
const dayjs = require('dayjs');
const withAuth = require('../utils/auth');
const { Playlist, Song, User, SongLib } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbSongData = await SongLib.findAll({
      attributes: ['id', 'song', 'artist', 'album', 'rating'],
      order: [['rating', 'DESC']],
      limit: 10,
    });

    const songs = dbSongData.map((song) => song.get({ plain: true }));

    const dbMoreSongData = await SongLib.findAll({
      attributes: ['song', 'artist', 'album', 'rating'],
      order: [['song', 'ASC']],
    });

    const moreSongs = dbMoreSongData.map((song) => song.get({ plain: true }));

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

    let userPlaylists;

    if (req.session.userId > 0) {
      const dbUserPlaylistData = await Playlist.findAll({
        where: {
          user_id: req.session.userId,
        },
        order: [['id', 'DESC']],
      });
      userPlaylists = dbUserPlaylistData.map((userMadePlaylist) =>
        userMadePlaylist.get({ plain: true })
      );
    } else {
      userPlaylists = [];
    }

    res.render('homepage', {
      userPlaylists: userPlaylists,
      songs: songs,
      moreSongs: moreSongs,
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

    // creates a false boolean result for the creator of the playlist, then checks if the creator of theplayist's id matches the currently logged in user. If yes, then the user will be able to edit or delete the playlist.
    let isCreator = false;
    if (req.session.userId === dbPlaylistName.user_id) {
      isCreator = true;
    }
    const playlist = dbPlaylistData.map((playlist) =>
      playlist.get({ plain: true })
    );

    // you can use day.js on playlistCreation to change it to a date format you'd like!
    let playlistCreation = dayjs(dbPlaylistName.createdAt).format(
      'MMM D, YYYY h:mm:ssA'
    );

    res.render('playlist', {
      playlist,
      isCreator,
      playlistCreation,
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

router.get('/song/:id', withAuth, async (req, res) => {
  try {
    const songData = await Song.findByPk(req.params.id);

    res.render('song', {
      song: songData.song,
      artist: songData.artist,
      album: songData.album,
      rating: songData.rating,
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
