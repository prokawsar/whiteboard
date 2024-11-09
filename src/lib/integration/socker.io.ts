import { dev } from '$app/environment';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const HOST = dev ? 'http://localhost:1000' : 'https://whiteboard-axbr.onrender.com/';

export const room = uuidv4();

export const initSocket = (roomId?: string) => {
	return io(HOST, {
		autoConnect: false,
		path: '/ws',
		transports: ['websocket'],
		query: {
			room: roomId ?? room
		}
	});
};

// export const socket = io(HOST, {
// 	autoConnect: false,
// 	path: '/ws',
// 	transports: ['websocket'],
// 	query: {
// 		room
// 	}
// });

// export default socket;
