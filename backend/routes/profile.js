const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.get('/', ensureLoggedIn, profileCtrl.getProfile);
router.put('/', ensureLoggedIn, profileCtrl.updateProfile);

module.exports = router;
