const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"))

const expressServer = app.listen(9000)
const io = socketio(expressServer);
io.on("connection", (socket) => {
    socket.emit("messageFromServer", { data: "Welcome to the socket.io server" })
    socket.on("messageToServer", dataFromClient => {
        console.log(dataFromClient)
    })

    socket.join("level1")
    socket.to("level1").emit("joined", "I have joined level1 room")
})

io.of("/admin").on("connection", socket => {
    io.of("/admin").emit("welcome", "Welcome to admin");
})
