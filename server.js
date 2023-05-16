const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return{
            socketId,
            userName: userSocketMap[socketId],
        }
    })
}

io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);
        socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
            userSocketMap[socket.id] = userName;
            socket.join(roomId);
            const clients = getAllConnectedClients(roomId);
            clients.forEach(({ socketId }) => {
                io.to(socketId).emit(ACTIONS.JOINED, {
                    clients,
                    userName,
                    socketId: socket.id,
                });
            });
        });
})


const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`listening on port ${PORT}!`))
