Event-based, real-time, bidirectional.

### Why is socket.io better than WS

WS create problem if user has firewall, Antivirus, proxy, thats why socket.io ir better option
WS doesnt have built in reconnection, socket.io has.
WS cant  work on old browsers and dont have backup mechanism

## Big 3

.emit - emits event to a socket by its string name
.on - registers handler for a given event
.connect - same as "connection" - connection to a namespace, default "/"

ping and pong are like a heart bing to check if client is still active and if we need to disconnect it

### Namespaces and rooms

On small aps they will be the same
namespaces - are to group multiple sockets together
    - internal endpoints
        - / /admin /user etc

in each namespace there are rooms

Only server socket knows about rooms, client socket only knows its namespace.
Rooms are automatically left upon disconnect

namespace.to and socket.to are different