var mongoose = require('mongoose');
var crypto = require('crypto');

var LinkSchema = mongoose.Schema({
  visits: { type: Number, default: 0 },
  url: { type: String },
  base_url: { type: String },
  code: { type: String },
  title: { type: String }
});

var Link = mongoose.model('Link', LinkSchema);

LinkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;