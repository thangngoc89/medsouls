"use strict";
var Blog = require('../../app/models/Blog');
var Book = require('../../app/models/Book');
var fbPost = require('../../app/models/fbPost');
var async = require('async');
var string = require('string');
var URI = require('urijs');

var i = 0;

// Get all fb posts
fbPost.find({}).exec(function(err, posts) {

  posts.reduce(function(map, item) {
    if (item.message != null && item.message.length > 0) {
      mactchPostWithBook(item);
    }
  });

});

var mactchPostWithBook = (post) => {
  var i = 0;
  let title = post.message.split('\n')[0];

  title = title.substring(0,40).replace(/(\(|\)|;|\[|\])/g, '');

  let regex = new RegExp('^' + title);
  Blog.findOne({
    title: regex
  }).exec(function(err, blog) {
    if (blog) {
      generateNewBookFromBlogAndPost(blog, post);
    }
  });
};

var generateNewBookFromBlogAndPost = function (blog, post) {
  let book = new Book(blog);

  let postUrl =  URI.withinString(post.message, function(url){
    //string(book.message).replaceAll(url, )
  })
};