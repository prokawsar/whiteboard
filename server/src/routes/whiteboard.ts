import express from 'express';
import { whiteboardExists } from '../db/queries';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ message: 'whiteboard home server' });
});

router.get('/:id', async (req, res) => {
	const boardExist = await whiteboardExists(req.params.id);
	console.log({ boardExist });
	if (!boardExist) {
		res.status(400).json({ message: 'Whiteboard not found' });
		return;
	}
	res.json({ message: 'whiteboard home server' });
});

router.post('/', (req, res) => {
	res.json({ message: 'whiteboard home server post' });
});

export default router;
