import { Buffer } from 'buffer';
import { format } from 'path';

var qs = require('querystring')

exports.sendHtml = function(res, html){
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Content-Length',Buffer.byteLength(html))
  res.end(html)
}

exports.parseReceivedData = function(req, cb){
  var body = ''
  req.setEncoding('utf8')
  req.on('data', function(chunk){
    body += chunk
  })
  req.on('end', function(){
    var data = qs.parse(body)
    cb(data)
  })
}

exports.actionForm = function(id, path, label){
  var html = '<form method="POST" action="' + 
  path + '">' +
  '<input type="hidden" name="id" value="' +
  id + '">'+
  '<input type="submit" value="'+
  label +
  '" />'+
  '</form>'
}