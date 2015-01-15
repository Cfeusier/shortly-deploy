var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: { type: String }
});

var User = mongoose.model('User', UserSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    err ? callback(err) : callback(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, null, null, function(err, hash) {
    if (err) {
      next(err);
    } else {
      this.password = hash;
      next(null, hash);
    }
  }.bind(this));
});

module.exports = User;
