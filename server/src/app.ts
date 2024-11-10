import express from 'express';
import routes from './routes/routes';
import dotenv from 'dotenv';
import middleware from './middleware/system';
import { createServer } from 'http';
import { initializeSocket } from './controllers/socket';
import mongodb from './db/mongodb';

dotenv.config();

const app = express();
const server = createServer(app);

const io = initializeSocket(server, {
	path: '/ws',
	transports: ['websocket'],
	allowUpgrades: true,
	pingTimeout: 10000,
	cors: {
		origin: '*'
	}
});

io.engine.on('connection_error', (err) => {
	console.log('Connection error:', err);
});

(async () => {
	const connection = await mongodb.connect();
	if (connection) {
		console.log('MongoDB connected');
	}
})();

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
