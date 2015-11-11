'use strict';
let _ = require('lodash');

exports.stringToArray = function(string) {
  let tags = string.split(/\s*,\s*/);
  return _.toArray(tags);
};
