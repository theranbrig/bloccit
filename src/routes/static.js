const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');

// Router instance of express app.  Defines routes
router.get('/', staticController.index);
router.get('/about', staticController.about);
router.get('/marco', staticController.marco);

module.exports = router;
