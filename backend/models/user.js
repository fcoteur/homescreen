var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

var Schema = mongoose.Schema;

var todoSchema = new Schema(
  {
    title: {type: String, required: true},
    done: {type: Boolean, default: false},
    created: { type: Date, default: Date.now },
    modified: { type: String}
  }
);

var locationSchema = new Schema({
  city: {type: String, required: true},
  countryCode:  {type: String, required: true},
  created: { type: Date, default: Date.now },
  modified: { type: String}
  }
);

var bookmarkSchema = new Schema(
  {
    name: {type: String, required: true},
    url: {type: String, required: true},
    created: { type: Date, default: Date.now },
    modified: { type: Date}
  }
);

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    lastLogin: {type: Date},
    todos: [todoSchema],
    bookmarks: [bookmarkSchema],
    locations: [locationSchema]
  }
);

userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}
module.exports = mongoose.model('User', userSchema);