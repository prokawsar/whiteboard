import mongoose from 'mongoose';

const MONGODB_URL =
	'mongodb+srv://prokawsar:2o0TKPKMtoqfq26K@main-cluster.uwbda.mongodb.net/?retryWrites=true&w=majority&appName=main-cluster';
const MONGODB_URL_DEV = 'mongodb://localhost:27017/whiteboards';

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
