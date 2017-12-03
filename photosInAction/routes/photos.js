var photos = []
photos.push({
  name: 'jy',
  path: 'https://jy-radio.gznb.com/wisdomradio/static/frontstatic/img/bg.3d3d8b5.jpg'
})
photos.push({
  name: 'logo',
  path: 'https://jy-radio.gznb.com/wisdomradio/static/frontstatic/img/logo.7c1b9bf.png'
})
exports.photos = photos
exports.list = function (req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  })
}