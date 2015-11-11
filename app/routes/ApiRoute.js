'use strict';

/**
* API Route
* path: /api
******************** */

let express    = require('express');
let Controller = rootRequire('app/controllers/BlogsController');
let router     = express.Router();

router.get('/blogs', Controller.index.get);

module.exports = router;
