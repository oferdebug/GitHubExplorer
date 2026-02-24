const crypto = require('node:crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const EXPECTED_KEY_LENGTH = 32;
const EXPECTED_HEX_LENGTH = EXPECTED_KEY_LENGTH * 2;
const HEX_REGEX = /^[0-9a-fA-F]+$/;

function validateKeyFormat(key) {
	if (!key) return 'ENCRYPTION_KEY environment variable is not defined.';
	if (key.length !== EXPECTED_HEX_LENGTH)
		return `ENCRYPTION_KEY must be exactly ${EXPECTED_HEX_LENGTH} hex characters (${EXPECTED_KEY_LENGTH} bytes), got ${key.length} characters.`;
	if (!HEX_REGEX.test(key))
		return 'ENCRYPTION_KEY contains invalid characters — must be a hex string (0-9, a-f, A-F).';
	return null;
}

const startupKeyError = validateKeyFormat(process.env.ENCRYPTION_KEY);
if (startupKeyError) {
	if (process.env.NODE_ENV === 'production') {
		console.error(`FATAL: ${startupKeyError}`);
		process.exit(1);
	}
	console.warn(
		`WARNING: ${startupKeyError} Encryption will fail at runtime.`,
	);
}

function getKey() {
	const raw = process.env.ENCRYPTION_KEY;
	const err = validateKeyFormat(raw);
	if (err) {
		throw new Error(err);
	}
	const buf = Buffer.from(raw, 'hex');
	if (buf.byteLength !== EXPECTED_KEY_LENGTH) {
		throw new Error(
			`ENCRYPTION_KEY decoded to ${buf.byteLength} bytes, expected ${EXPECTED_KEY_LENGTH}.`,
		);
	}
	return buf;
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
