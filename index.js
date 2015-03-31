var fs = require('fs');
var path = require('path');
var SocketPeer = require('socketpeer');
var url = require('url');

var server = new SocketPeer();

server.on('request', function (req, res) {
  var stream;
  var p = url.parse(req.url).pathname;
  if (p === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream = fs.createReadStream(path.join(__dirname, 'index.html'));
    stream.pipe(res);
  }
});
