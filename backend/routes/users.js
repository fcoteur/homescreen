var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

// GET users
router.get('/', user_controller.list);

// POST new user
router.post('/new', user_controller.new);

// UPDATE user
router.put('/update/:userId', user_controller.update);

// DELETE user
router.delete('/delete/:userId', user_controller.delete);

module.exports = router;
