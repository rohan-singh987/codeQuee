import express from 'express';
const app = express()
import { createServer } from 'http';
import { Server } from 'socket.io';


const server =  createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);
})

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => console.log(`listening on port ${PORT}!`))