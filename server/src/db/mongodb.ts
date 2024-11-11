import mongoose from 'mongoose';

const MONGODB_URL_DEV = 'mongodb://localhost:27017/whiteboards';
const MONGODB_URL = process.env.MONGODB_URL || '';

export default {
	connect: async () => {
		try {
			const connection = await mongoose.connect(
				process.env.MODE == 'production' ? MONGODB_URL : MONGODB_URL_DEV,
				{}
			);
			return connection;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
};
