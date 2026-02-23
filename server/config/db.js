const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 5000,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`MongoDB connection failed: ${error.message}`);
		console.error(
			'Server will continue running but auth features will not work.',
		);
		console.error('Make sure your IP is whitelisted in MongoDB Atlas.');
	}
};
module.exports = connectDB;
