
# HttpServerHelper

Minimalist wrapper for Node's native `HttpServer` object.

Features :

- easy setup ;
- transparent event logging ;
- decouple request handling from generic server logic.

This module is good for experimenting and quick prototyping due to its easy setup and rich log output.
However it might not be suited when precise configurations, performances, or security are required.


# Minimalistic example

```javascript
var httpServer = require('httpserverhelper').createServer({
  handleRequest: function(pRequest, pResponse) {
    pResponse.end('hello, world');
  }
});
httpServer.start(80);
```

Output :

```
http server listening on :::80
```

If you visit http://localhost/index.html you will get the following kind of output :

```
http server connection
http request:
{ url: '/index.html',
  method: 'GET',
  httpVersion: '1.1',
  headers:
   { host: 'localhost',
     'accept-encoding': 'gzip, deflate',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9',
     'accept-language': 'fr-fr',
     dnt: '1',
     connection: 'keep-alive' } }
http server connection
http request:
{ url: '/favicon.ico',
  method: 'GET',
  httpVersion: '1.1',
  headers:
   { host: 'localhost',
     'accept-encoding': 'gzip, deflate',
     connection: 'keep-alive',
     accept: '*/*',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9',
     'accept-language': 'fr-fr',
     referer: 'http://localhost/index.html',
     dnt: '1' } }
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
