const router = require('express').Router();
const { Playlist } = require('../../models');


router.post('/:id', async (req, res) => {
  try {
    const dbPlaylistData = await Playlist.create({
      title: req.body.title,
      rating: req.body.rating,
      user_id: req.params.id,
    });

    res.status(200).json(dbPlaylistData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});