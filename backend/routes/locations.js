var express = require('express');
var router = express.Router();

var location_controller = require('../controllers/locationController');

// GET locations
router.get('/:userId', location_controller.list);

// POST new locations
router.post('/new/:userId', location_controller.new);

// UPDATE locations
router.post('/update/:userId', location_controller.update);

// DELETE locations
router.post('/delete/:userId', location_controller.delete);

module.exports = router;