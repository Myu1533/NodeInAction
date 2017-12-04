var Photo = require('../models/Photo')
var path = require('path')
var fs = require('fs')
var join = path.join
var photos = []

exports.photos = photos
exports.list = function (req, res, next) {
  Photo.find({}, function (err, photos) {
    if (err) return next(err)
    res.render('index', {
      title: 'Photos',
      photos: photos
    })
  })
}
exports.form = function (req, res) {
  res.render('upload', {
    title: 'Photo upload'
  })
}
exports.submit = function (req, res, next) {
  var img = req.file
  Photo.create({
    _fid: img.filename,
    name: req.body.name || img.originalname,
    path: img.filename,
    mimetype: img.mimetype.split('image/')[1]
  }, function (err) {
    if (err) return next(err)
    res.redirect('/')
  })
}