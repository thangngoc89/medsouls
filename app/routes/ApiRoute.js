'use strict';

/**
* API Route
* path: /api
******************** */

let express    = require('express');
let Controller = rootRequire('app/controllers/BlogsController');
let UtilsController = rootRequire('app/controllers/UtilsController');
let router     = express.Router();

router.get('/blogs', Controller.index.get);
router.post('/utils/unshorten', UtilsController.unshorten.post);

module.exports = router;
