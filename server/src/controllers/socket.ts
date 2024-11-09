import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
import { Server as HTTPServer } from 'http';

export function initializeSocket(server: HTTPServer, options: Partial<ServerOptions>) {
	const io = new SocketIOServer(server, options);

	io.on('connection', (socket: Socket) => {
		console.log('A user connected');
		const count = io.engine.clientsCount;
		console.log({ count });

		// Handle incoming message event
		socket.on('message', (msg: string) => {
			console.log('message:', msg);
			io.emit('message', `${msg} server`);
		});

		// Handle drawing event
		socket.on('draw', (data) => {
			socket.broadcast.emit('draw', data);
		});

		socket.on('text', (data) => {
			socket.broadcast.emit('text', data);
		});

		socket.on('beginPath', (data) => {
			socket.broadcast.emit('beginPath', data);
		});

		// Handle clear canvas event
		socket.on('clear', () => {
			socket.broadcast.emit('clear');
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
