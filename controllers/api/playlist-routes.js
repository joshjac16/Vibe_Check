const router = require('express').Router();
const { Playlist, Song, SongLib } = require('../../models');
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
    console.log(newPlaylist);
    res.status(201).json(newPlaylist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// If a DELETE request is made to /api/posts/:id, that post is deleted.

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const playlistData = await Playlist.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!playlistData) {
      res.status(404).json({ message: 'No playlist found with this id!' });
      return;
    }

    res.status(200).json(playlistData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
