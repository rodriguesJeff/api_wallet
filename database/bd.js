const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234@cluster0.dppu7.gcp.mongodb.net/wallet?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

module.exports = mongoose;