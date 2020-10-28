const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wallet');
mongoose.Promise = global.Promise;

module.exports = mongoose;