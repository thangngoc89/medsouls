'use strict';

let mongoose = require('mongoose');
let database = 'mongodb://root:diendan@ds049624.mongolab.com:49624/books';
mongoose.connect(database);

module.exports = mongoose;
