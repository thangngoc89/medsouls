'use strict';
var Blog = rootRequire('app/models/Blog');

module.exports = {
  index: {
    get(req, res) {

      Blog.find({})
        .limit(20)
        .exec(function(err, blogs) {
          console.log(blogs);

          res.send(blogs.reduce(function(blogMap, item) {
            blogMap[item.id] = item;
            return blogMap;
          }, {}));
        });

    }
  }
};
