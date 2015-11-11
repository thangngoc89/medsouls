'use strict';

let Bypasser = require('node-bypasser');

var unshorten = function (url) {
  let w = new Bypasser(url);
  w.decrypt(function(err, result) {
    if (err == null && result.length > 1){
      return callback(result);
    }
  });
};

function callback(url){
  console.log(url);
  return url;
}


module.exports =  unshorten;

