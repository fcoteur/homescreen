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
      if (err) { 
        next(err);
      } else {
        res.send({ title: 'Bookmark List', bookmarks: user.bookmarks });
      }
    });
  }
];

exports.new = [
  body('name')
    .not().isEmpty()
    .trim()
    .escape(),
  body('url')
    .not().isEmpty()
    .isURL(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    const { userId } = req.params;
    const { name, url } = req.body;

    User.findById(userId)
    .exec(function (err, user) {
      if (err) { 
        next(err);
      } else {
        user.bookmarks.push({ name, url })
        user.save()
        res.send({ title: 'New Bookmark', bookmarks: user.bookmarks });
      }
    });
  }
];

exports.update = [
  body('bookmarkId')
    .not().isEmpty(),
  body('name')
    .not().isEmpty()
    .trim()
    .escape(),
  body('url')
    .not().isEmpty()
    .isURL(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    const { userId } = req.params;
    const { bookmarkId, name, url } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err) { 
        next(err);
      } else {
        const indexBookmark = user.bookmarks.findIndex(e => e._id == bookmarkId) 
        if (indexBookmark !== -1) {
          user.bookmarks[indexBookmark].name = name
          user.bookmarks[indexBookmark].url = url
          user.save()
          res.send({ title: 'Bookmark updated', bookmarks: user.bookmarks });
        } else {
          const err = new Error('id of the bookmark is not found in the user profile')
          next(err)
        } 
      }
    });
  }
];

exports.delete = [
  body('bookmarkId')
    .not().isEmpty(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    const { userId } = req.params;
    const { bookmarkId } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err) { 
        next(err);
      } else {
        user.bookmarks = user.bookmarks.filter(e => e._id != bookmarkId);
        user.save();
        res.send({ title: 'Deleted Bookmark', bookmarks: user.bookmarks });
      }
    });
  }
];
