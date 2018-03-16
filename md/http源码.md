## github官方地址

[github地址](https://github.com/nodejs/node/tree/v0.12)

快捷键T,查找代码.

下面检索Http的代码

http.js源码中的部分

```
const incoming = require('_http_incoming');
const outgoing = require('_http_outgoing');

//上面是IO部分

//下面是node的一个私有模块的_http_server
const server = require('_http_server');

const { Server } = server;

function createServer(requestListener) {
  return new Server(requestListener);
}
```
`_http_server`私有模块内部的东西
```
function Server(options, requestListener) {
  if (requestListener) {
    this.on('request', requestListener);
  }

```
搜搜`request`
```
if (server.listenerCount('checkContinue') > 0) {
       server.emit('checkContinue', req, res);
     } else {
       res.writeContinue();
       server.emit('request', req, res);
     }
```
搜索`res`
```

  var res = new server[kServerResponse](req);
  res._onPendingData = updateOutgoingData.bind(undefined, socket, state);
```

搜索`kServerResponse`
```
const kServerResponse = Symbol('ServerResponse');
```
搜索`ServerResponse`

```
function ServerResponse(req) {
  OutgoingMessage.call(this);

  if (req.method === 'HEAD') this._hasBody = false;

  this.sendDate = true;
  this._sent100 = false;
  this._expect_continue = false;

  if (req.httpVersionMajor < 1 || req.httpVersionMinor < 1) {
    this.useChunkedEncodingByDefault = chunkExpression.test(req.headers.te);
    this.shouldKeepAlive = false;
  }
}
util.inherits(ServerResponse, OutgoingMessage);
//这是一个继承关系:ServerResponse继承OutgoingMessage
//所以我们拿到的ServerResponse是OutgoingMessage的一个实例.

```
去`_http_outgoing`这个模块去找
```
const { OutgoingMessage } = require('_http_outgoing');
```

```
function OutgoingMessage() {
  Stream.call(this);

  // Queue that holds all currently pending data, until the response will be
  // assigned to the socket (until it will its turn in the HTTP pipeline).
  this.output = [];
  this.outputEncodings = [];
  this.outputCallbacks = [];

```

接下来搜索`parserOnIncoming`
```
function parserOnIncoming(server, socket, state, req, keepAlive) {
  resetSocketTimeout(server, socket, state);
  state.incoming.push(req);
```
find
```
parser.onIncoming = parserOnIncoming.bind(undefined, server, socket, state);
```
find
```
var parser = parsers.alloc();
```
find
```
const {
  parsers,
  freeParser,
  debug,
  CRLF,
  continueExpression,
  chunkExpression,
  httpSocketSetup,
  kIncomingMessage,
  _checkInvalidHeaderChar: checkInvalidHeaderChar
} = require('_http_common');
```
进入`_http_common`
```
var parsers = new FreeList('parsers', 1000, function() {
  var parser = new HTTPParser(HTTPParser.REQUEST);

  parser._headers = [];
  parser._url = '';
  parser._consumed = false;

  parser.socket = null;
  parser.incoming = null;
  parser.outgoing = null;
```

搜索`OnInComing`
```
return parser.onIncoming(parser.incoming, shouldKeepAlive);
```
find `parser.incoming`
```
const incoming = require('_http_incoming');
const {
  IncomingMessage,
  readStart,
  readStop
} = incoming;
```
find `_http_incoming`
```
function IncomingMessage(socket) {
  Stream.Readable.call(this);

  this.socket = socket;
  this.connection = socket;

  this.httpVersionMajor = null;
  this.httpVersionMinor = null;
  this.httpVersion = null;
  this.complete = false;
  this.headers = {};
  this.rawHeaders = [];
  this.trailers = {};
  this.rawTrailers = [];

  this.readable = true;
```

### express

在express里面的`request.js`里面`req的原型是http.IncomingMessage`
````
var req = Object.create(http.IncomingMessage.prototype)
````
在express里面的`response.js`里面的`res的原型是http.ServerResponse`
```
var res = Object.create(http.ServerResponse.prototype)
```

`ParserOnIncoming上层函数是connectionListener`

我们来到`net.js`查找
```
function onconnection(err, clientHandle) {
  self.emit('connection', socket);
}

function setupListenHandle(address, port, addressType, backlog, fd) {
this._handle.onconnection = onconnection;
}


Server.prototype._listen2 = setupListenHandle;

function listenInCluster(server, address, port, addressType,
                         backlog, fd, exclusive) {
    server._listen2(address, port, addressType, backlog, fd);
    return;
  }


Server.prototype.listen = function(...args) {
    if (typeof options.fd === 'number' && options.fd >= 0) {
  listenInCluster(this, null, null, null, backlogFromArgs, options.fd);
  return this;
}
  }

listenInCluster(this, null, -1, -1, backlogFromArgs);
```
### 总结:
```
1.req的原型是http.IncomingMessage
2.res的原型是http.ServerResponse
ServerResponse继承OutgoingMessage
我们需要了解emit触发事件.listener监听事件.
```
