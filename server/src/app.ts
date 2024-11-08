import express from 'express';
import routes from './routes/routes';
import dotenv from 'dotenv';
import middleware from './middleware/system';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
	path: '/ws',
	transports: ['websocket'],
	allowUpgrades: true,
	pingTimeout: 10000,
	cors: {
		// origin: 'http://localhost:5173'
		origin: '*'
	}
});

io.on('connection', (socket) => {
	console.log('a user connected');
	const count = io.engine.clientsCount;
	console.log({ count });

	socket.on('message', (msg) => {
		console.log('message: ' + msg);
		io.emit('message', msg + 'server');
	});

	socket.on('draw', (data) => {
		socket.broadcast.emit('draw', data);
	});

	socket.on('clear', () => {
		socket.broadcast.emit('clear');
	});

	socket.on('disconnect', () => {
		console.log('disconnect');
	});

	socket.on('error', (error) => {
		console.log('Socket error:', error);
	});
});

io.engine.on('connection_error', (err) => {
	console.log('Connection error:', err);
});

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(middleware.logger);

// all routes here
routes(app);

// app.use(middleware.noRouteHandler)

export default server;
