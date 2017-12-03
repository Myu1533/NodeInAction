var express = require('express');
var router = express.Router();
var photos = require('./photos')

/* GET home page. */
// router.get('/', photos.list);
router.get('/', function(req, res, next) {
  res.render('index', { photos: photos.photos });
});

module.exports = router;
