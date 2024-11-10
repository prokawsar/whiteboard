import mongoose from 'mongoose';

const whiteboardSchema = new mongoose.Schema(
	{
		roomId: String,
		boardId: String,
		elements: []
	},
	{ timestamps: true }
);

export const WhiteboardModel = mongoose.model('whiteboard', whiteboardSchema);
