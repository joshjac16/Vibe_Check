const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Playlist, Song } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/playlist/:id', withAuth, async (req, res) => {
  try {
    const dbPlaylistData = await Playlist.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [
        {
          model: Playlist,
          attributes: ['title', 'description'],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;