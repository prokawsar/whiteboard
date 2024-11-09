import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
import { Server as HTTPServer } from 'http';

export function initializeSocket(server: HTTPServer, options: Partial<ServerOptions>) {
	const io = new SocketIOServer(server, options);

	io.on('connection', (socket: Socket) => {
		const room = socket.handshake.query.room as string;

		const count = io.engine.clientsCount;
		console.log({ count });

		if (!room) {
			socket.disconnect();
			return;
		}

		// Join the specified room
		socket.join(room);
		console.log('A user connected to room', room);

		// Handle drawing event
		socket.on('draw', (data) => {
			socket.to(room).emit('draw', data);
		});

		socket.on('text', (data) => {
			socket.to(room).emit('text', data);
		});

		socket.on('beginPath', (data) => {
			socket.to(room).emit('beginPath', data);
		});

		// Handle clear canvas event
		socket.on('clear', () => {
			socket.to(room).emit('clear');
		});

		// Handle disconnection
		socket.on('disconnect', () => {
			console.log('User disconnected');
		});

		// Handle socket errors
		socket.on('error', (error: Error) => {
			console.error('Socket error:', error);
		});
	});

	return io;
}
