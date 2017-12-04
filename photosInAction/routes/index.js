var express = require('express');
var router = express.Router();
var photos = require('./photos')

/* GET home page. */
// router.get('/', photos.list);
router.get('/', photos.list);

module.exports = router;
