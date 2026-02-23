const mongoose = require('mongoose');
const { encrypt } = require('../utils/crypto');

const userSchema = new mongoose.Schema(
	{
		githubId: { type: String, required: true, unique: true },
		username: { type: String, required: true },
		displayName: { type: String, default: '' },
		avatarUrl: { type: String },
		accessToken: { type: String, select: false },
	},
	{ timestamps: true },
);

userSchema.pre('save', function () {
	if (this.isModified('accessToken') && this.accessToken) {
		this.accessToken = encrypt(this.accessToken);
	}
});

userSchema.set('toJSON', {
	transform(_doc, ret) {
		delete ret.accessToken;
		return ret;
	},
});

module.exports = mongoose.model('User', userSchema);
