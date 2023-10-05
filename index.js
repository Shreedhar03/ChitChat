const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
require('colors')
const route = require('./Routes/routes')
const cors = require('cors')
// const bodyParser = require('body-parser');

let server
app.use(cors({
    origin: `${process.env.URL}`
}))
app.use(express.json())
// app.use(bodyParser.json())
app.use('/api', route)


const connectToSocket = (server) => {
    const io = require('socket.io')(server, {
        pingTimeout: 600000,
        cors: {
            origin: `${process.env.URL}`
        }
    })
    io.on('connection', (socket) => {
        // console.log("connected to socket.io ")

        socket.on('setup', (currentUser) => {
            socket.join(currentUser)
            console.log("userData._id", currentUser)
            socket.emit("connected")
        })

        socket.on("join chat", (room) => {
            socket.join(room)
            console.log(`User joined the room ${room}`.bgGreen)
        })
        socket.on('typing', (room, sender) => {
            console.log("-----------------typing--------------".bgBlue, sender)
            socket.to(room).emit('senderTyping', sender)
        })
        socket.on('stopTyping', (room, sender) => {
            console.log("-----------------stopped typing--------------".bgRed, sender)
            socket.to(room).emit('senderStoppedTyping', sender)
        })
        socket.on("new message", (newMessageReceived, room) => {
            let chat = newMessageReceived.chat
            // console.log("newMessageReceived",newMessageReceived)
            if (!chat.users) return console.log("chat.user not defined")
            console.log(`room ${room}`.bgGreen)
            chat.users.forEach(user => {
                console.log(user._id)
                if (user._id == newMessageReceived.sender._id) {
                    return
                } else {
                    console.log("send message")
                    socket.to(room).emit("message received", newMessageReceived)
                }
            })
        })
    })


}

/*  */

// const connectToSocket = (server) => {

//     const io = require("socket.io")(server, {
//         pingTimeout: 60000,
//         cors: {
//             origin: "http://localhost:3000",
//             // credentials: true,
//         },
//     });

//     io.on("connection", (socket) => {
//         // console.log("Connected to socket.io");
//         socket.on("setup", (userData) => {
//             socket.join(userData._id);
//             socket.emit("connected");
//         });

//         socket.on("join chat", (room) => {
//             socket.join(room);
//             console.log("User Joined Room: " + room);
//         });
//         socket.on("typing", (room) => socket.in(room).emit("typing"));
//         socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//         socket.on("new message", (newMessageRecieved) => {
//             var chat = newMessageRecieved.chat;

//             if (!chat.users) return console.log("chat.users not defined");

//             chat.users.forEach((user) => {
//                 if (user._id == newMessageRecieved.sender._id) return;

//                 socket.to("651a6d10c86598863e622585").emit("message recieved", newMessageRecieved);
//             });
//         });

//         socket.off("setup", () => {
//             console.log("USER DISCONNECTED");
//             socket.leave(userData._id);
//         });
//     });

// }


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB".cyan.bold)
    server = app.listen(process.env.PORT || 3000, () => { console.log("Server Runnning on 5000".yellow.bold) })
    connectToSocket(server)
}).catch((err) => {
    console.log("Error connecting to DB : ".red.bold, err.message)
})

