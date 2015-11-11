'use strict';
let mongoose	= require('mongoose');
let Schema		= mongoose.Schema;

let BlogSchema	= new Schema({
	title : String,
	content: String,
	image: String,
	link: String,
	tags: String,
	tags_processed: Array,
	date: Date
});

module.exports = mongoose.model('Blog', BlogSchema);