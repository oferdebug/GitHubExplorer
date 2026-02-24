const mongoose = require('mongoose');

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

const connectDB = async () => {
	if (!process.env.MONGO_URI) {
		if (process.env.NODE_ENV === 'production') {
			console.error(
				'FATAL: MONGO_URI environment variable is not defined — cannot connect to MongoDB.',
			);
			process.exit(1);
		}
		console.error(
			'WARNING: MONGO_URI environment variable is not defined — skipping MongoDB connection.',
		);
		return;
	}
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const conn = await mongoose.connect(process.env.MONGO_URI, {
				serverSelectionTimeoutMS: 5000,
			});
			console.log(`MongoDB Connected: ${conn.connection.host}`);
			mongoose.connection.on('error', (err) =>
				console.error('MongoDB connection error:', err.message),
			);
			mongoose.connection.on('disconnected', () =>
				console.warn(
					'MongoDB disconnected (possible network/server issue). ' +
						'Mongoose will auto-reconnect after initial connect; ' +
						'if this was an explicit disconnect/close the app must call connect() again.',
				),
			);
			return;
		} catch (error) {
			console.error(
				`MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`,
			);
			if (attempt < MAX_RETRIES) {
				console.log(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
				await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
			} else {
				console.error(
					'All connection attempts failed. Auth features will not work.',
				);
				console.error(
					'Make sure your IP is whitelisted in MongoDB Atlas.',
				);
				if (process.env.NODE_ENV === 'production') {
					console.error(
						'FATAL: Cannot connect to MongoDB in production.',
					);
					process.exit(1);
				}
			}
		}
	}
};
module.exports = connectDB;
