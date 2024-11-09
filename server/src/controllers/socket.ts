import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
import { Server as HTTPServer } from 'http';

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

		socket.on('draw', (data) => {
			socket.to(room).emit('draw', data);
		});

		socket.on('text', (data) => {
			socket.to(room).emit('text', data);
		});

		socket.on('beginPath', (data) => {
			socket.to(room).emit('beginPath', data);
		});

		socket.on('clear', () => {
			socket.to(room).emit('clear');
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
