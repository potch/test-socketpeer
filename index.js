var fs = require('fs');
var http = require('http');
var path = require('path');
var SocketPeer = require('socketpeer');

var httpServer = http.createServer(function (req, res) {
  var stream;
  var url = req.url;
  console.log(url);
  if (url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream = fs.createReadStream(path.join(__dirname, 'index.html'));
    stream.pipe(res);
  }
  if (url === '/socketpeer.js') {
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
