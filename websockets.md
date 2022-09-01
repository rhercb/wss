# Intro

Websockets provide a way to exchange data between browser and server via a persistent connection. Built on RCF 6455
Data ir passed in both directions as "Packets" without breaking connection and no need of HTTP requests

To create a new websocket connection we need to create new WS
```javascript
let socket = new WebSocket("ws://javascript.info");
```
There is also wss:// protocol that is encripted. Its like HTTPS for websocket.
Always prefer wss://, it is more reliable

Once the socket is created, we have 4 events that will listen to events

Open - connection established,
Message - data received
Error - websocket error
Close - connection closed
Send - send data

Simple node BE - https://javascript.info/article/websocket/demo/server.js

# Opening a websocket

When new WebSocket(url) is created, it starts connection immediately.

During connection browser using headers asks if server supports WebSockets, if yes, then it continues using WebSocket protocol.

Here's example of websocket headers

```text
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

Origin - origin of the client page.
Connection: Upgdare - signals that the client would like to change the protocol
Upgrade: websocket - the request protocol is "websocket"
Sec-WebSocket-Key - a random browser-generated key, used to ensure that hte server supports WebSocket protocol
Sec-WebSocket-Version - WebSocket protocol version

If server agrees to switch to WebSocket, it should send code 101 response

```text
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

# Extensions and subprotocols

There may be additional headers Sec-WebSocket-Extensions and Sec-WebSocket-Protocol that describe extensions and subprotocols.

Protocols - SOAP and WAMP

Optionals headers are set using second parameter.

```javascript
let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
```

# Data transfer

Websocket communication consists of "Frames" - data fragment.

"text frames" - contain text data
"binary data frames" - contains binary data
"ping/pong frames" - are used to check connections sent from server, browser responds to these automatically
"connection close frame" - service frame

In browser we directly work with text and binary frames.

.send() method can send either text or binary data icluding blob or arraybuffer, no settings are required.

# Rate limit

Imagine our app sends a lot of data, but user has a slow network.
We can call socket.send(data) again and again, but the data will be buffered in memory and sent out only as fast as network speed allows
the socket.bufferAmount property stores how many bytes remain buffered at this moment, waiting to be sent.
We can examine it to see wheather the socket is actually available for transmission

```javascript
// every 100ms examine the socket and send more data
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```

# Connection close

When party wants to close the connection, they send a connection close frame with a numeric code and text reason

```javascript
socket.close([code], [reason]);
```

code - is a special WebSocket code (optional)
reason - is a string that describes the reason (optional)

Most common code values

1000 - the default, normal closure
1006 - no way to set such code manually, indicates that the connection was lost
1001 - the party is going away, e.g. server is shutting down, or a browser leaves the page
1009 - the message is too big to process
1011 - unexpected error on server

Full list here - https://www.rfc-editor.org/rfc/rfc6455#section-7.4.1

# Connection state

To get connection state, additional socket.readyState is used

0 - "CONNECTING" the connection has not yet been established
1 - "OPEN" communicating
2 - "CLOSING" the connection is closing
3 - "CLOSED" the connection is closed