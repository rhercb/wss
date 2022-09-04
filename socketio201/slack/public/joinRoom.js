function joinRoom(roomName) {
    // send this roomName to the server
    nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
        // Update room member total
        document.querySelector(".curr-room-num-users").innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
    })

    nsSocket.on("historyCatchUp", history => {
        const messageUl = document.querySelector("#messages");
        messageUl.innerHTML = "";
        history.forEach(msg => {
            const newMessage = buildHtml(msg);
            const currentMessages = messageUl.innerHTML
            messageUl.innerHTML = currentMessages + newMessage
        })
        messageUl.scrollTo(0, messageUl.scrollHeight)
    })

    nsSocket.on("updateMembers", num => {
        document.querySelector(".curr-room-num-users").innerHTML = `${num} <span class="glyphicon glyphicon-user"></span>`
        document.querySelector(".curr-room-text").innerText = `${roomName}`
    })
}