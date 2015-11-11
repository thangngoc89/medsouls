'use strict';
let Blog = rootRequire('app/models/Blog');

module.exports = {
  index: {
    get(req, res) {
      res.send('you are reaching blogs index')
    }
  }
};
