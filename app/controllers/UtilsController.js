'use strict';
let Blog = rootRequire('app/models/Blog');
let Bypasser = require('node-bypasser');
let URI = require('urijs');
let async = require('async');

module.exports = {
  unshorten: {
    post(req, res, next) {
      var data = req.body;

      var getUrlRegEx = new RegExp(
        "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
        , "g"
      );

      var urls = data.match(getUrlRegEx);

      async.forEach(urls, function (url, callback) {
        let w = new Bypasser(url);
        w.decrypt(function (err, res) {
          if (err == null && res != undefined) {
            data = data.replace(url, generateAnchorHref(res));
            console.log(url + '---->' + res);
            callback();
          }
        });
      }, function(err) {
        res.send(data);
      });

      // End controller

      var generateAnchorHref = (url) => {
        return "<a href='"+ url +"' target='_blank'>"+ url +"</a>";
      }

    }
  }
};