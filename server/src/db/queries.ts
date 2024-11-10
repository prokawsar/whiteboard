import { WhiteboardModel } from '../model/whiteboardSchema';

export const createBoard = async (boardId: string) => {
	const result = await WhiteboardModel.create({
		boardId,
		elements: []
	});

	return result;
};

export const whiteboardExists = async (boardId: string) => {
	const existingWhiteboard = await WhiteboardModel.findOne({ boardId });
	return existingWhiteboard !== null;
};

export const getWhiteboard = async (boardId: string) => {
	const whiteboard = await WhiteboardModel.findOne({ boardId });
	return whiteboard;
};

export const updateWhiteboard = async (boardId: string, updates: any) => {
	const updatedWhiteboard = await WhiteboardModel.findOneAndUpdate(
		{ boardId },
		{ $set: updates },
		{ new: true, upsert: false }
	);
	return updatedWhiteboard;
};

export const addElementsToWhiteboard = async (boardId: string, newElements: any[]) => {
	const updatedWhiteboard = await WhiteboardModel.findOneAndUpdate(
		{ boardId },
		{ $push: { elements: { $each: newElements } } },
		{ new: true }
	);
	return updatedWhiteboard;
};
