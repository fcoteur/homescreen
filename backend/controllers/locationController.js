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
      if (err || !user) { 
        next(err);
      } else {
        res.send({ title: 'Location List', location: user.locations });
      }
    });
  }
];

exports.new = [
  body('city')
    .not().isEmpty()
    .trim()
    .escape(),
  body('countryCode')
    .not().isEmpty()
    .trim()
    .escape(),
  body('utcDiff')
    .not().isEmpty()
    .trim()
    .escape(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { city, countryCode, utcDiff } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err || !user) { 
        next(err);
      } else {
        user.locations.push({ city, countryCode, utcDiff })
        user.save((err, product) => {
          if (err) next(err)
          res.send({ title: 'New Location', location: user.locations });
          }
        )        
      }
    });
  }
];

exports.update = [
  body('locationId')
    .not().isEmpty(),
  body('city')
    .not().isEmpty()
    .trim()
    .escape(),
  body('countryCode')
    .not().isEmpty()
    .trim()
    .escape(),
  body('utcDiff')
    .not().isEmpty()
    .trim()
    .escape(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { locationId, city, countryCode,utcDiff } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err || !user) { 
        next(err);
      } else {
        const indexLocation = user.locations.findIndex(e => e._id == locationId) 
        if (indexLocation !== -1) {
          user.locations[indexLocation].city = city
          user.locations[indexLocation].countryCode = countryCode
          user.locations[indexLocation].utcDiff = utcDiff
          user.save((err, product) => {
            if (err) next(err)
            res.send({ title: 'Location updated', location: product });
          })
        } else {
          const err = new Error('id of the location is not found in the user profile')
          next(err)
        } 
      }
    });
  }
];

exports.delete = [
  body('locationId')
    .not().isEmpty(),
  param('userId')
    .isMongoId(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { locationId } = req.body;
    User.findById(userId)
    .exec(function (err, user) {
      if (err || !user) { 
        next(err);
      } else {
        user.locations = user.locations.filter(e => e._id != locationId);
        user.save((err, product) => {
          if (err) next(err)
          res.send({ title: 'Deleted Location', location: product });
        });
      }
    });
  }
];
