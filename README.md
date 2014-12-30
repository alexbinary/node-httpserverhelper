
# HttpServerHelper

Minimalist wrapper for Node's native `HttpServer` object.

Features :

- easy setup ;
- transparent event logging ;
- decouple request handling from generic server logic.

This module is good for experimenting and quick prototyping due to its easy setup and rich log output.
However it might be not suitable for precise configurations and performances/security requirements.


# Minimalistic example

```javascript
var httpServer = require('httpserverhelper').createServer({
  handleRequest: function(pRequest, pResponse) {
    pResponse.end('hello, world');
  }
});
httpServer.start(80);
```


# Module documentation

## Exported methods

### createServer([requestHandler])

Creates and returns a new `Server` object with the given request handler.

`requestHandler` must provide a function `handleRequest` which will be called
for each request the server receives, with the request and the response being passed
as first and second parameter respectively.
Request and response are native `http.ClientRequest` and `http.ServerResponse` objects respectively.

If `requestHandler` does not provide a valid `handleRequest` function a warning message
is logged in the console and nothing happens when the server receives a request.


# 'Server' object documentation

## Constructor

### Server([requestHandler])

Init a new HTTP server with given request handler.
See `createServer()` above.

## Properties

### httpServer

The underlying native `HttpServer` object.

## Methods

### start([port])

Start the server on specified port.
If port is omitted a random port is selected.

## Events

### listening

Emitted when the server is ready and listening for connections.
Event listener is passed the address and port the server is listening to.


# Infos

Node.js HTTP module : http://nodejs.org/api/http.html


# Contact

Alexandre Bintz <alexandre.bintz@gmail.com>  
Any comment or suggestion is welcome.
