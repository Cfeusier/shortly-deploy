var mongoose = require('mongoose');

var host = process.env.HOST || '127.0.0.1';
var database = 'mongodb://127.0.0.1/shortlyDevDb';

if (process.env.NODE_ENV === 'production') {
  database = 'mongodb://MongoLab-p:LkWzgLG0L9EnAoeTRDGwX7SoKDzSeXFqC2s8O6Uygns-@ds041167.mongolab.com:41167/MongoLab-p';
}

mongoose.connect(database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() { console.log('mongo hooked'); });

module.exports = db;