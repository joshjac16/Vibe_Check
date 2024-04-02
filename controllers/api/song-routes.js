const router = require('express').Router();
const { Song } = require('../../models');


router.post('/:id', async (req, res) => {
  try {
    const dbSongData = await Song.create({
      song: req.body.song,
      artist: req.body.artist,
      album: req.body.album,
      rating: req.body.rating,
      playlist_id: req.params.id,
    });

    res.status(200).json(dbUserData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});