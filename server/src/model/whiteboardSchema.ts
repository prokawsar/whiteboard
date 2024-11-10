import mongoose from 'mongoose';

const whiteboardSchema = new mongoose.Schema({
	createdAt: String,
	updatedAt: String,
	roomId: String,
	elements: []
});

export const WhiteboardModel = mongoose.model('whiteboard', whiteboardSchema);
