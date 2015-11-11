'use strict';

var mongoose	= require('../../config/db.js');
var Schema		= mongoose.Schema;

var BlogSchema	= new Schema({
  title : String,
  content: String,
  image: String,
  link: String,
  tags: String,
  tags_processed: Array,
  date: Date
});

module.exports = mongoose.model('blogs', BlogSchema);