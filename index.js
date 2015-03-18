var fs = require('fs');
var http = require('http');
var path = require('path');
var SocketPeer = require('socketpeer');
var url = require('url');

var httpServer = http.createServer(function (req, res) {
  var stream;
  var p = url.parse(req.url).pathname;
  if (p === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream = fs.createReadStream(path.join(__dirname, 'index.html'));
    stream.pipe(res);
  }
  if (p === '/socketpeer.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    stream = fs.createReadStream(path.join(__dirname, 'node_modules/socketpeer/socketpeer.js'));
    stream.pipe(res);
  }
});

var sp = new SocketPeer({
  httpServer: httpServer
});

var port = (process.env.PORT || 3000);

httpServer.listen(port, '0.0.0.0', function () {
  console.log('Server listening on 0.0.0.0:%d', port);
});
