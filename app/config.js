var mongoose = require('mongoose');

var host = process.env.HOST || '127.0.0.1';
var database = 'mongodb://' + host + '/' + 'shortlyDevDb';

if (process.env.NODE_ENV === 'production') {
  database = 'mongodb://' + host + '/' + 'shortlyDb';
}

mongoose.connect(database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() { console.log('mongo hooked'); });

module.exports = db;