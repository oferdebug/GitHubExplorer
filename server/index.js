require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const connectDB = require('./config/db');
const passport = require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

//Connect To Db
connectDB();

//Middleware
app.use(
	cors({
		origin: process.env.CLIENT_URL || 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(express.json());
app.use(morgan('dev'));
if (!process.env.SESSION_SECRET) {
	console.error('FATAL: SESSION_SECRET is not set in .env');
	process.exit(1);
}
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 * 1000,
		},
	}),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/github', require('./routes/github'));
app.use('/api/favorites', require('./routes/favorites'));

app.get('/', (_req, res) => {
	res.send('Github Explorer API Ready!');
});
// Global error handler — catches unhandled errors and returns JSON
app.use((err, _req, res, _next) => {
	console.error('Unhandled error:', err);
	res.status(err.status || 500).json({
		error: 'Internal server error',
	});
});

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
