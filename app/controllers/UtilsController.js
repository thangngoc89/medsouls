'use strict';
let Blog = rootRequire('app/models/Blog');

module.exports = {
  unshorten: {
    post(req, res) {
      let data = req.body;
      res.send(data);
    }
  }
};
