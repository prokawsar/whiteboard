import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ message: 'whiteboard home server' });
});

router.post('/', (req, res) => {
	res.json({ message: 'whiteboard home server post' });
});

export default router;
