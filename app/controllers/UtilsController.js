'use strict';
let Blog = rootRequire('app/models/Blog');
let Bypasser = require('node-bypasser');
let URI = require('urijs');
let async = require('async');
let stringUtils = require('../../utils/stringUtils');

module.exports = {
  unshorten: {
    post(req, res, next) {
      var data = req.body;

      var getUrlRegEx = stringUtils.urlRegEx();

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