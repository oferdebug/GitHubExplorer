const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: { type: String, enum: ['repo', 'user'], required: true },
		githubId: { type: String, required: true },
		name: { type: String, required: true },
		fullName: { type: String },
		description: { type: String },
		avatarUrl: { type: String },
		url: { type: String },
		stars: { type: Number },
		language: { type: String },
	},
	{ timestamps: true },
);

favoriteSchema.index({ user: 1, type: 1, githubId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
