const express = require('express');

const premiumController = require('../controllers/premium');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/showLeaderBoard', authenticatemiddleware.authenticate,premiumController.getUserLeaderBoard);


module.exports = router;