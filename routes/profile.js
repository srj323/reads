const path = require('path');

const express = require('express');

const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/profile/:UserId/:alert', profileController.getProfileerr);
router.get('/profile/:UserId', profileController.getProfile);
router.post('/profile/:UserId', profileController.getEditProfile);
router.post('/edit-profile', profileController.postEditProfile);

module.exports = router;
