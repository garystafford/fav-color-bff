#!/usr/bin/env node

var http = require('http');
var httpProxy = require('http-proxy');
var config = require('config');
var port = process.env.WEB_BFF_PORT || config.get('port');
var proxy = httpProxy.createProxyServer({});

// proxy.on('proxyReq', function (proxyReq, req, res, options) {
//   proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
// });

var server = http.createServer(function (req, res) {

  console.log('Requested URI: ' + req.url);

  proxy.web(req, res, {
    target: {
      host: process.env.API_URL || config.get('api.url'),
      port: process.env.API_PORT || config.get('api.port')
    }
  });
});

console.log('Listening on port ' + port);
console.log('API URL: ' + config.get('api.url'));
console.log('API Port: ' + config.get('api.port'));
server.listen(port);
