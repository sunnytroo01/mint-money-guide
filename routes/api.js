const express = require('express');
const router = express.Router();
const { subscribe, submitContact } = require('../controllers/subscriberController');

router.post('/subscribe', subscribe);
router.post('/contact', submitContact);

module.exports = router;
