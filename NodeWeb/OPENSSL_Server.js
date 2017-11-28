var https = require('https')
var fs = require('fs')

var options = {
  key: fs.readFileSync('./key.pem').toString(),
  cert: fs.readFileSync('./key-cert.pem').toString()
}

https.createServer(options, function (req, res) {
  res.writeHead(200)
  res.end('hello world\n')
}).listen(3000, function(){
  console.log('start')
})