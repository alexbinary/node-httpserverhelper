/**
 * httpserverhelper.js - Minimalist wrapper for Node's native `HttpServer` object.
 *
 * @author Alexandre Bintz
 * dec. 2014
 */

"use strict";

var rHttp   = require('http');
var rEvents = require('events');

/**
 * Server
 *
 * @constructor
 *
 * @param {object} pRequestHandler - request handler
 *        must have following functions:
 *        - handleRequest({http.ClientRequest}, {http.ServerResponse})
 */
function Server(pRequestHandler) {

  /* checks if request handler is valid
   */
  function requestHandlerIsValid(pRequestHandler) {
    return pRequestHandler && typeof pRequestHandler.handleRequest == 'function';
  }

  if(!requestHandlerIsValid(pRequestHandler)) {
    console.warn('WARNING: creating HTTP server with invalid request handler');
  }

  rEvents.EventEmitter.call(this);

  this.httpServer = rHttp.createServer();

  var _this = this; // _this references the current Server object

  this.httpServer.on('listening', function() {

    var address = _this.httpServer.address();
    console.log('http server listening on ' + address.address + ':' + address.port);
    _this.emit('listening', address.address, address.port);
  });

  this.httpServer.on('connection', function() {

    console.log('http server connection');
  });

  this.httpServer.on('request', function(pRequest, pResponse) {

    console.log('http request:');
    console.log({
      'url':         pRequest.url,
      'method':      pRequest.method,
      'httpVersion': pRequest.httpVersion,
      'headers':     pRequest.headers
    });

    if(requestHandlerIsValid(pRequestHandler)) {
      pRequestHandler.handleRequest(pRequest, pResponse);
    }
  });

  this.httpServer.on('close', function() {

    console.log('http server close');
  });

  this.httpServer.on('error', function(pError) {

    console.error('ERROR: http server error: ' + pError);
  });

  this.httpServer.on('clientError', function (pException) {

    console.error('ERROR: http client error: ' + pException);
  });
}
Server.prototype = Object.create(rEvents.EventEmitter.prototype);

/**
 * Server - start server
 *
 * @param {number} pPort - port to listen on, a random port is selected if omitted
 */
Server.prototype.start = function(pPort) {

  this.httpServer.listen(pPort);
}

/**
 * Create a new Server object
 *
 * @param {object} pRequestHandler - request handler
 *        must have following functions:
 *        - handleRequest({http.ClientRequest}, {http.ServerResponse})
 *
 * @return {Server}
 */
function createServer(pRequestHandler) {

  return new Server(pRequestHandler);
}

/* exports
 */
module.exports.createServer = createServer;
