/*
 * index.js - httpserver demo
 *
 * @author Alexandre Bintz
 * dec. 2014
 *
 * usage:
 *
 * node index.js port
 *
 * if omitted, port defaults to 80
 */

"use strict";

var rHttpServer = require('./httpserver');

var defaultPort = 80;
var port = process.argv.length > 2 && process.argv[2].match(/^[0-9]+$/) ? process.argv[2] : defaultPort;

var requestHandler = {
  handleRequest: function handleRequest(pRequest, pResponse) {
    pResponse.end('hello, world');
  }
};
var httpServer = rHttpServer.createServer(requestHandler);

httpServer.start(port);
