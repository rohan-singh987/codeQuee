import { io } from "socket.io-client";

const backend = 'http://localhost:1234'
export const initSocket = async() => {

        const options = {
            'force new connection': true,
            reconnectionAttempt: 'Infinity',
            timeout: 10000,
            transports: ['websocket'],
        }
    
    return io(backend, options);
}