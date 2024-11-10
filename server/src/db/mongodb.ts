import mongoose from 'mongoose';

const MONGODB_URL =
	'mongodb+srv://prokawsar:2o0TKPKMtoqfq26K@main-cluster.uwbda.mongodb.net/?retryWrites=true&w=majority&appName=main-cluster';

export default {
	connect: async () => {
		try {
			const connection = await mongoose.connect(MONGODB_URL, {});
			return connection;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
};
