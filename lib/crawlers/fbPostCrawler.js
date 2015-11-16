"use strict";
var fbPost = require('../../app/models/fbPost');
var request = require('request-promise');
var async = require('async');

// Load .env
require('dotenv').load();

var accessToken = process.env.FACEBOOK_USER_TOKEN;
var url = 'https://graph.facebook.com/v2.3/866095646806710/feed?access_token=' + accessToken;

var getGraph = (url) => {

  var options = {
    uri: url,
    json: true
  };

  request(options)
    .then(function (res) {
      var data = res.data;
        url = (res.paging) ? res.paging.next : false;

      data.forEach(function(post) {
        createNewfbPostDocument({
          id: post.id,
          message: post.message,
          type: post.type,
          link: post.link,
          created_at: post.created_time,
          updated_at: post.updated_time
        });
      });

    })
    .catch(function (err) {
      console.error('There is a error ' + err);
    })
    .finally(function () {
      return;
      if (url) {
        getGraph(url);
      } else {
        console.log('Done');
      }
    });
};

var createNewfbPostDocument = (data) => {

  let newDocument = new fbPost(data);

  newDocument.save(function(err) {
    if (err) {
      console.error('There is a error ' + err);
    }

    let message = (newDocument.message) ? newDocument.message.split('\n')[0] : 'nah';

    console.log('Created new post: ' + message);
  });
};

getGraph(url);