const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Playlist, Song } = require('../models');

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

    //   const dbSongData = await Song.findAll({
    //     include: [
    //       {
    //         model: Song,
    //         attributes: ['song', 'artist', 'album', 'rating'],
    //       },
    //     ],
    //   });

    // const songs = dbSongData.map((song) => song.get({ plain: true }));
    res.render('homepage', {
      // playlists,
      // songs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/playlists', withAuth, async (req, res) => {
//   try {
//     const dbPlaylistData = await Playlist.findAll({
//       where: {
//         user_id: req.session.userId,
//       },
//       include: [
//         {
//           model: Playlist,
//           attributes: ['title'],
//         },
//       ],
//     });

//     const playlists = dbPlaylistData.map((playlists) =>
//       playlists.get({ plain: true })
//     );

//     res.render('homepage', {
//       // playlists,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/playlist/:id', withAuth, async (req, res) => {
  try {
    const dbPlaylistData = await Song.findAll({
      where: {
        playlist_id: req.params.id,
      },
    });
    const dbPlaylistName = await Playlist.findByPk(req.params.id);
    console.log(typeof dbPlaylistData, dbPlaylistData);
    const playlist = dbPlaylistData.map((playlist) =>
      playlist.get({ plain: true })
    );
    console.log(playlist);
    res.render('playlist', {
      playlist,
      playlistTitle: dbPlaylistName.title,
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
