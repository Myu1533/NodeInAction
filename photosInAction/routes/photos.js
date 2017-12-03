var Photo = require('../models/Photo')
var path = require('path')
var fs = require('fs')
var join = path.join
var photos = []

// photos.push({
//   name: 'jy',
//   path: 'https://jy-radio.gznb.com/wisdomradio/static/frontstatic/img/bg.3d3d8b5.jpg'
// })
// photos.push({
//   name: 'logo',
//   path: 'https://jy-radio.gznb.com/wisdomradio/static/frontstatic/img/logo.7c1b9bf.png'
// })
exports.photos = photos
exports.list = function (req, res, next) {
  // res.render('photos', {
  //   title: 'Photos',
  //   photos: photos
  // })
  Photo.find({}, function(err, photos){
    if(err) return next(err)
    res.render('photos', {
      title: 'Photos',
      photos: photos
    })
  })
}
exports.form = function(req, res){
  res.render('upload', {
    title: 'Photo upload'
  })
}
exports.submit = function(dir){
  return function(req,res,next){
    console.log(req.body)
    var img = req.files.photo.image
    var name = req.body.photo.name || img.name
    var path = join(dir, img.name)
    fs.rename(img.path, path, function(err){
      if(err) return next(err)
      Photo.create({
        name: name,
        path: img.name
      }, function(err){
        if(err) return next(err)
        res.redirect('/')
      })
    })
  }
}
