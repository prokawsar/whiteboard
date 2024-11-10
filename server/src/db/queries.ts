import { WhiteboardModel } from '../model/whiteboardSchema';

export const createBoard = async (roomId: string) => {
	const result = await WhiteboardModel.create({
		roomId,
		elements: []
	});
	console.log(result);

	return result;
};

export const whiteboardExists = async (roomId: string) => {
	const existingWhiteboard = await WhiteboardModel.findOne({ roomId });
	return existingWhiteboard !== null;
};

export const getWhiteboard = async (roomId: string) => {
	const whiteboard = await WhiteboardModel.findOne({ roomId });
	return whiteboard;
};

export const updateWhiteboard = async (roomId: string, updates: any) => {
	const updatedWhiteboard = await WhiteboardModel.findOneAndUpdate(
		{ roomId },
		{ $set: updates },
		{ new: true, upsert: false }
	);
	return updatedWhiteboard;
};

export const addElementsToWhiteboard = async (roomId: string, newElements: any[]) => {
	const updatedWhiteboard = await WhiteboardModel.findOneAndUpdate(
		{ roomId },
		{ $push: { elements: { $each: newElements } } },
		{ new: true }
	);
	return updatedWhiteboard;
};
