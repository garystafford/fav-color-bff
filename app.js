#!/usr/bin/env node

var http = require('http');
var httpProxy = require('http-proxy');
var config = require('config');
var port = config.get('port') || 8081;
var proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

var server = http.createServer(function (req, res) {

  console.log(req.url);

  proxy.web(req, res, {
    target: {
      host: config.get('api.url') || 'localhost',
      port: config.get('api.port') || 81
    }
  });
});

console.log('listening on port ' + port);
server.listen(port);
