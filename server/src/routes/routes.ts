import type { Express } from 'express';
import whiteboard from './whiteboard';

export default (app: Express) => {
	app.use('/api/hello', whiteboard);
	app.use('*', (req, res) => {
		res.status(400).json({ message: 'not found' });
	});
	//more endpoints goes here
};
