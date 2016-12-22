#!/usr/bin/env node

var http = require('http');
var httpProxy = require('http-proxy');
var config = require('config');
var port = process.env.PORT || config.get('port');
var proxy = httpProxy.createProxyServer({});

// proxy.on('proxyReq', function (proxyReq, req, res, options) {
//   proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
// });

var server = http.createServer(function (req, res) {

  console.log(req.url);

  proxy.web(req, res, {
    target: {
      host: process.env.API_URL || config.get('api.url'),
      port: process.env.API_PORT || config.get('api.port')
    }
  });
});

console.log('listening on port ' + port);
server.listen(port);
