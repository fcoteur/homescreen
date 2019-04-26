var express = require('express');
var router = express.Router();

var bookmark_controller = require('../controllers/bookmarkController');

// GET bookmarks
router.get('/:userId', bookmark_controller.list);

// POST new bookmark
router.post('/new/:userId', bookmark_controller.new);

// UPDATE bookmark
router.post('/update/:userId', bookmark_controller.update);

// DELETE bookmark
router.post('/delete/:userId', bookmark_controller.delete);

module.exports = router;