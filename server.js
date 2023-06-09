const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
// const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
        return{
            socketId,
            userName: userSocketMap[socketId],
        }
    })
}

io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);

        socket.on("join", ({ roomId, userName }) => {
            userSocketMap[socket.id] = userName;
            socket.join(roomId);

            const clients = getAllConnectedClients(roomId);

            console.log(clients);

            clients.forEach(({ socketId }) => {
                io.to(socketId).emit("joined", {
                    clients,
                    userName,
                    socketId: socket.id,
                });
            });
        });

        socket.on("disconnecting", () => {
            const rooms = [...socket.rooms];
            rooms.forEach((roomId) => {
                socket.in(roomId).emit('disconnected', {
                    socketId : socket.id,
                    userName : userSocketMap[socket.id]
                })
            })
            delete userSocketMap[socket.id];
            socket.leave();
        })
})


const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`listening on port ${PORT}!`))
