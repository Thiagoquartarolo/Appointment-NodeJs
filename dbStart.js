var mongoose = require('mongoose');
var config = require('./domain/config');

mongoose.connect(config.database);
