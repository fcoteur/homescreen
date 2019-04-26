var express = require('express');
var router = express.Router();

var todo_controller = require('../controllers/todoController');

// GET todos
router.get('/:userId', todo_controller.list);

// POST new todo
router.post('/new/:userId', todo_controller.new);

// UPDATE todo
router.post('/update/:userId', todo_controller.update);

// DELETE todo
router.post('/delete/:userId', todo_controller.delete);

module.exports = router;
