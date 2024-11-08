import io from 'socket.io-client';

const HOST = 'http://localhost:1000';

const socket = io(HOST, { autoConnect: false, path: '/ws' });

export default socket;
