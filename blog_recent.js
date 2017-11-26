var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  console.log(req.url)
  if (req.url == '/') {
    fs.readFile('./titles.json', function (err, data) {
      if (err) {
        console.error(err);
      } else {
        var titles = JSON.parse(data.toString());
        fs.readFile('./template.html', function (err, data) {
          if (err) {
            console.error(err);
            res.end('Server err');
          } else {
            var tmpl = data.toString();
            var html = tmpl.replace('%', titles.join('</li><li>'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
          }
        })
      }
    })
  }
}).listen(8000, '127.0.0.1', function(){
  console.log('listen on')
});