const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');

// Router instance of express app.  Defines routes
router.get('/', staticController.index);

module.exports = router;
