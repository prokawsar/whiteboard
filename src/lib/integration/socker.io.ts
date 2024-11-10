import { dev } from '$app/environment';
import io from 'socket.io-client';

const HOST = dev ? 'http://localhost:1000' : 'https://whiteboard-axbr.onrender.com/';

export const initSocket = (roomId?: string) => {
	return io(HOST, {
		autoConnect: false,
		path: '/ws',
		transports: ['websocket'],
		query: {
			room: roomId
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
