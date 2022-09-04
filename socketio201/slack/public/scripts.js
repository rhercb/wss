const socket = io("http://localhost:9000")
let nsSocket = "";
// Listen to all nsList
socket.on("nsList", nsData => {
    let namespacesDiv = document.querySelector(".namespaces");
    namespacesDiv.innerHTML = "";

    nsData.forEach(ns => {
        namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}"/></div>`
    })

    // add a click listener for each ns
    Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
        elem.addEventListener("click", e => {
            const nsEndpoint = elem.getAttribute("ns");
        })
    })

    joinNs("/wiki")
})
