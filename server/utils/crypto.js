const crypto = require('node:crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

if (!process.env.ENCRYPTION_KEY) {
	if (process.env.NODE_ENV === 'production') {
		console.error(
			'FATAL: ENCRYPTION_KEY environment variable is not defined.',
		);
		process.exit(1);
	}
	console.warn(
		'WARNING: ENCRYPTION_KEY environment variable is not defined — encryption will fail at runtime.',
	);
}

function getKey() {
	const key = process.env.ENCRYPTION_KEY;
	if (!key) {
		throw new Error('ENCRYPTION_KEY is not set');
	}
	return Buffer.from(key, 'hex');
}

function encrypt(text) {
	if (!text) return text;
	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
	let encrypted = cipher.update(text, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	const tag = cipher.getAuthTag();
	return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

function decrypt(data) {
	if (!data) return data;
	const [ivHex, tagHex, encrypted] = data.split(':');
	const iv = Buffer.from(ivHex, 'hex');
	const tag = Buffer.from(tagHex, 'hex');
	const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
	decipher.setAuthTag(tag);
	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

module.exports = { encrypt, decrypt };
