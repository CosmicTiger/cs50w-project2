// main.js
/**
 * @author CosmicTiger - Luisangel Marcia
 **/

// Catch the username in localStorage
let username = localStorage.getItem("username")
// Catch the last channel visited by username
let lastChannel = localStorage.getItem("latest_channel")
// Stablish the current channel of the session
let currentChannel = (lastChannel) ? lastChannel : ""
// Instance of socket.io
const socketServer = io.connect(`${location.protocol}//${document.domain}:${location.port}`)
// Instance for templates
let message_template = null

function getUsername () {
    const loginForm = document.querySelector()
    const formUsername = document.querySelector()
    const formSubmit = document.querySelector()

    formSubmit.disabled = true

    formUsername.onkeyup = () => {
        formSubmit.disabled = (formUsername.value.length > 0) ? false : true
    }

    formSubmit.onsubmit = () => {
        username = formUsername.value
        localStorage.setItem('username', username)
        window.location.reload(false)

        return false
    }

    loginForm.style.display = "block"
}

// Socket functions
function triggerSocket() {
    // on connect, we add the event handler for submit the channels
    socketServer.on("connect", () => {
        document.querySelector().onsubmit = () => {
            socketServer.emit("channels-new", {"channel": document.querySelector().value })
            document.querySelector().value = ""
            return false
        }

        if (currentChannel) {
            socket.emit("channels-join", {
                "username": username,
                "channel": currentChannel,
            })
        }
    })

    socketServer.on('add username', data => {

        const { error, username } = data

        console.log(data)

        if(error != "") {
            window.setTimeout(function() {
                // const flackModal = document.querySelector("#FlackModal")
                $("#FlackModal").modal({ backdrop: 'static', keyboard: false })

                const modalTitle = document.querySelector('.modal-title')
                modalTitle.text(error)

                const modalInput = document.querySelector("#modalInput")
                modalInput.val("")

                const modalButton = document.querySelector("#modalButton")
                modalButton.attr('disabled', true)
            }, 900)
        } else {
            localStorage.setItem('username', username)

            const usernameIdentification = document.querySelector("#usernameIdentification")
            usernameIdentification.text(localStorage.getItem("username"))

            const generalChannel = document.querySelector("#general")
            generalChannel.click()

            const messageInput = document.querySelector("#messageInput")
            messageInput.focus()

        }
    })
}

const main = () => {
    // message_template = Handlebars.compile(document.querySelector().innerHTML)

    return triggerSocket()

    // if(!username) {
    //     getUsername()
    // } else {
    //     // greetings to the user
    //     const greetingUser = document.querySelector('#greeting')
    //     gretting.innerHTML = `Hello, ${username}!`
    //     greeting.style.display = "block"

    //     // show the messages of the channels to the user
    //     document.querySelector().style.display = "block"
    // }
}

document.addEventListener('DOMContentLoaded', main())
