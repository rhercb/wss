function joinNs(endpoint) {
    nsSocket = io(`http://localhost:9000${endpoint}`);
    nsSocket.on("nsRoomLoad", nsRooms => {
        let roomList = document.querySelector(".room-list")
        roomList.innerHTML = "";
        nsRooms.forEach(room => {
            let glyph;
            if (room.privateRoom) {
                glyph = "lock";
            } else {
                glyph = "globe";
            }
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        })
        // add a click listener to each room
        let roomNodes = document.getElementsByClassName("room")
        Array.from(roomNodes).forEach(elem => {
            elem.addEventListener("click", e => {

            })
        })

        // add to first room automatically here
        const topRoom = document.querySelector(".room");
        const topRoomName = topRoom.innerText;
        joinRoom(topRoomName)
    })

    nsSocket.on("messageToClients", msg => {
        console.log(msg)
        document.querySelector("#messages").innerHTML += buildHtml(msg)
    })

    document.querySelector(".message-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const newMsg = document.querySelector("#user-message").value;
        nsSocket.emit("newMessageToServer", { text: newMsg });
    })
}

function buildHtml(msg) {
    const convertedDate = new Date(msg.time).toLocaleString();
    const newHtml = `
     <li>
        <div class="user-image">
            <img src="${msg.avatar}" />
        </div>
        <div class="user-message">
            <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
            <div class="message-text">${msg.text}</div>
        </div>
    </li>
    `

    return newHtml;
}