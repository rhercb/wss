const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"))

const expressServer = app.listen(9000)
const io = socketio(expressServer);

io.on("connection", (socket) => {
    // build an array to send back with the img and endpoint on each ns
    let nsData = namespaces.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })

    // send the ns data back to the client, socket not IO
    socket.emit("nsList", nsData)
})

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on("connect", nsSocket => {
        console.log(`${nsSocket.id} joined ${namespace.endpoint}`)
        // A socket has connected to one of chat namespaces
        // Send that ns info back

        nsSocket.emit("nsRoomLoad", namespaces[0].rooms)
        nsSocket.on("joinRoom", (roomToJoin, numberOfUserCb) => {
            // nsSocket.leave([...nsSocket.rooms][1]);
            // Joins specific room
            nsSocket.join(roomToJoin)
            // numberOfUserCb(2)

            const nsRoom = namespaces[0].rooms.find(room => {
                return room.roomTitle === roomToJoin
            })

            // nsSocket.emit("historyCatchUp", nsRoom.history)
            const roomsize = io.of(namespace.endpoint).to(roomToJoin).allSockets().size;
            // console.log(io.of("/wiki").sockets.size)
            io.of(namespace.endpoint).to(roomToJoin).emit("updateMembers", roomsize)
        })
        nsSocket.on("newMessageToServer", msg => {
            console.log(msg)
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: "test",
                avatar: "https://via.placeholder.com/30"
            }
            // Send this msg to all sockets that are in a room that this socket is in
            const roomTitle = [...nsSocket.rooms][1];
            const nsRoom = namespace.rooms.find(room => {
                return room.roomTitle === roomTitle
            })
            nsRoom.addMessage(fullMsg)
            io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg)
        })
    })
})
