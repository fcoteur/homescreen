var User = require('../models/user')
const { validationResult } = require('express-validator/check');
const { body, param } = require('express-validator/check');

exports.list = [
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    User.findById(userId)
    .exec(function (err, user) {
      if (err  || !user) { 
        next(err);
      } else {
        res.send({ title: 'Todo List', todos: user.todos });
      }
    });
  }
];

exports.new = [
  body('title')
    .not().isEmpty()
    .trim()
    .escape(),
  body('done')
    .isBoolean(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { title, done } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err || !user) { 
        next(err);
      } else {
        user.todos.push({ title, done })
        user.save((err, product) => {
          if (err) next(err)
          res.send({ title: 'New Todo', todos: product });
        })
      }
    });
  }
];

exports.update = [
  body('todoId')
    .not().isEmpty(),
  body('title')
    .not().isEmpty()
    .trim()
    .escape(),
  body('done')
    .isBoolean(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { todoId, title, done } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err || !user) { 
        next(err);
      } else {
        const indexTodo = user.todos.findIndex(e => e._id == todoId) 
        if (indexTodo !== -1) {
          user.todos[indexTodo].title = title
          user.todos[indexTodo].done = done
          user.save((err, product) => {
            if (err) next(err)
            res.send({ title: 'Todo Updated', todos: product });
          })
        } else {
          const err = new Error('id of the todo is not found in the user profile')
          next(err)
        } 
      }
    });
  }
];

exports.delete = [
  body('todoId')
    .not().isEmpty(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { todoId } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err) { 
        next(err);
      } else {
        user.todos = user.todos.filter(e => e._id != todoId);
        user.save((err, product) => {
          if (err) next(err)
          res.send({ title: 'Deleted Todo', todos: product });
        });
      }
    });
  }
];
