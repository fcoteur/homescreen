var User = require('../models/user');
const { validationResult } = require('express-validator/check');
const { body, param} = require('express-validator/check');

exports.list = function(req, res, next) {
  User.find({})
  .exec(function (err, list) {
    if (err) { 
      next(err);
    } else {
      res.send({ title: 'User List', list: list });
    }
  });
};

exports.new = [
  body('email')
    .isEmail()
    .normalizeEmail(),
  body('name')
    .not().isEmpty()
    .trim()
    .escape(),
  body('password')
    .not().isEmpty()
    .trim(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    user.save((err, doc) => {
      if (err) {
        next(err);
      } else {
        res.send({ title: 'New User', id: doc._id });
      }
    });
  }
];

exports.update = [
  body('email')
    .isEmail()
    .normalizeEmail(),
  body('name')
    .not().isEmpty()
    .trim()
    .escape(),
  body('password')
    .not().isEmpty()
    .trim(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userId = req.params.userId;
    const { email, password, name } = req.body;
    User.findById(userId, (err, doc)=> {
      if (err) {
        next(err);
      } else {
        doc.email = email;
        doc.password = password;
        doc.name = name;
        doc.save();
        res.send({ title: 'User updated', id: doc._id });
      }
    });
  }
]

exports.delete = [
  param('userId')
    .not().isEmpty()
    .trim(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const userId = req.params.userId;
    User.findByIdAndDelete(userId, (err,doc) => {
      if (err) {
        next(err);
      } else {
        res.send({action: 'User deleted', id: doc._id})
      }   
    });
  }
];