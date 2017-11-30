var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/tasks')

// var Schema = mongoose.Schema;

// var Tasks = new Schema({
//   project: String,
//   description: String
// })

// mongoose.model('Tasks', Tasks)