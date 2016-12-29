#!/usr/bin/env node

var http = require('http');
var httpProxy = require('http-proxy');
var config = require('config');

var port = process.env.WEB_BFF_PORT || config.get('port');
var targetHost = process.env.API_URL || config.get('api.url');
var targetPort = process.env.API_PORT || config.get('api.port');
var proxy = httpProxy.createProxyServer({});

// proxy.on('proxyReq', function (proxyReq, req, res, options) {
//   proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
// });

var server = http.createServer(function (req, res) {

  console.log('Requested endpoint: ' + req.url);

  proxy.web(req, res, {
    target: {
      host: targetHost,
      port: targetPort
    }
  });
});

console.log('Listening on port: ' + port);
console.log('API URL: ' + targetHost);
console.log('API Port: ' + targetPort);
server.listen(port);
