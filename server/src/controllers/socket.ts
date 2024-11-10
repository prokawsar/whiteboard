import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { _EVENTS } from '../utils/constants';
import { addElementsToWhiteboard } from '../db/queries';

export function initializeSocket(server: HTTPServer, options: Partial<ServerOptions>) {
	const io = new SocketIOServer(server, options);

	io.on('connection', (socket: Socket) => {
		const room = socket.handshake.query.room as string;

		if (!room) {
			socket.disconnect();
			return;
		}

		// Join the specified room
		socket.join(room);

		console.log('A user connected to room', room);
		const total = io.sockets.adapter.rooms.get(room) as Set<string>;
		console.log('Total user', total.size);
		//TODO: Send join user event with total user count

		socket.on(_EVENTS.DRAW, (data) => {
			socket.to(room).emit(_EVENTS.DRAW, data);
		});

		socket.on(_EVENTS.TEXT, (data) => {
			socket.to(room).emit(_EVENTS.TEXT, data);
			// addElementsToWhiteboard(room, data);
		});

		socket.on(_EVENTS.BEGIN_PATH, (data) => {
			socket.to(room).emit(_EVENTS.BEGIN_PATH, data);
		});

		socket.on(_EVENTS.CLEAR, () => {
			socket.to(room).emit(_EVENTS.CLEAR);
		});

		socket.on('disconnect', () => {
			console.log('User disconnected');
		});

		socket.on('error', (error: Error) => {
			console.error('Socket error:', error);
		});
	});

	return io;
}
