const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const SocketPeer = require('socketpeer');

const host = process.env.SOCKETPEER_HOST || process.env.HOST || '0.0.0.0';
const port = process.env.SOCKETPEER_PORT || process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
const httpServer = http.createServer();
const peer = new SocketPeer({
  httpServer: httpServer,
  serveLibrary: true
});

httpServer.on('request', (req, res) => {
  const p = url.parse(req.url).pathname;
  if (p === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else if (!p.startsWith('/socketpeer/')) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('File not found');
  }
});

if (!module.parent) {
  httpServer.listen(port, host, () => {
    console.log('[%s] Server listening on %s:%s', nodeEnv, host, port);
  });
}

module.exports.httpServer = httpServer;

module.exports.peer = peer;
