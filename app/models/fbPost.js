'use strict';
var mongoose	= require('../../config/db.js');
var Schema		= mongoose.Schema;

var fbPostSchema	= new Schema({
  id: String,
  type: String,
  message: String,
  link: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('fbposts', fbPostSchema);