'use strict';
var mongoose	= require('../../config/db.js');
var Schema		= mongoose.Schema;
var validator = require('validator');

var validateUrl = (string) => {
  return validator.isURL(string, {
    allow_underscores: true
  });
};

var BooksSchema	= new Schema({
  title: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
      message: '{VALUE} is not a valid URL!'
    }
  },
  tags: Array,
  date: Date,
  single_url: Boolean
});

module.exports = mongoose.model('books', BooksSchema);