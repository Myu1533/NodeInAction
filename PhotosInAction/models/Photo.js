var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/photo_app')
var schema = new mongoose.Schema({
    _fid: String,
    name: String,
    path: String,
    mimetype: String
})

module.exports = mongoose.model('Photo', schema)