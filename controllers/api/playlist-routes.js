const router = require('express').Router();
const { Playlist } = require('../../models');
const { Song } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  const songs = await Song.findAll();
  res.render('playlist', { songs });
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPlaylist = await Playlist.create({
      title: req.body.title,
      rating: req.body.rating,
      user_id: req.session.userId,
    });
    res.status(200).json(newPlaylist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     const dbPlaylistData = await Playlist.create({
//       title: req.body.title,
//       rating: req.body.rating,
//       user_id: req.params.id,
//     });

//     res.status(200).json(dbPlaylistData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
