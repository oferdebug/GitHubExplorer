const router = require('express').Router();
const passport = require('../config/passport');

// Initiate GitHub OAuth
router.get(
	'/github',
	passport.authenticate('github', { scope: ['user:email'] }),
);

// GitHub OAuth callback
router.get(
	'/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
	},
);

// Get current authenticated user
router.get('/me', (req, res) => {
	if (req.isAuthenticated()) {
		const { _id, githubId, username, displayName, avatarUrl } = req.user;
		return res.json({ _id, githubId, username, displayName, avatarUrl });
	}
	res.status(401).json({ error: 'Not authenticated' });
});

// Logout
router.post('/logout', (req, res) => {
	req.logout((err) => {
		if (err) return res.status(500).json({ error: err.message });
		req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.json({ message: 'Logged out' });
		});
	});
});

module.exports = router;
