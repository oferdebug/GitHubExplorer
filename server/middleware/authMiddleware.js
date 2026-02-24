function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ error: 'You Must Be Logged In To Do That' });
}
module.exports = { isAuthenticated };
