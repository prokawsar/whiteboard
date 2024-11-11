import { Router } from 'express';
import { createBoard, getWhiteboard, whiteboardExists } from '../db/queries';

const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'whiteboard home server' });
});

router.post('/createBoard', async (req, res) => {
	const { uuid } = req.body;

	if (!uuid) {
		res.status(400).json({ message: 'Board id required' });
		return;
	}
	const boardExist = await getWhiteboard(uuid);

	if (!boardExist) {
		await createBoard(uuid);
		console.log('Board created');
		res.json({ message: 'Board created successfully' });
		return;
	}
	res.json(boardExist);
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
