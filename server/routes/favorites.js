const router = require('express').Router();
const Favorite = require('../models/Favorite');
const { isAuthenticated } = require('../middleware/authMiddleware');

const ALLOWED_TYPES = ['repo', 'user'];

// Get all favorites for the logged-in user
router.get('/', isAuthenticated, async (req, res) => {
	try {
		const favorites = await Favorite.find({ user: req.user._id }).sort({
			createdAt: -1,
		});
		res.json(favorites);
	} catch (err) {
		console.error('GET /favorites error:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Check if an item is favorited
router.get('/check', isAuthenticated, async (req, res) => {
	try {
		const { type, githubId } = req.query;
		if (!type || !githubId) {
			return res
				.status(400)
				.json({
					error: 'Missing required query params: type, githubId',
				});
		}
		const favorite = await Favorite.findOne({
			user: req.user._id,
			type,
			githubId,
		});
		res.json({
			isFavorited: !!favorite,
			favoriteId: favorite?._id || null,
		});
	} catch (err) {
		console.error('GET /favorites/check error:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Add a favorite
router.post('/', isAuthenticated, async (req, res) => {
	try {
		const {
			type,
			githubId,
			name,
			fullName,
			description,
			avatarUrl,
			url,
			stars,
			language,
		} = req.body;
		if (!type || !githubId || !name) {
			return res
				.status(400)
				.json({
					error: 'Missing required fields: type, githubId, name',
				});
		}
		if (!ALLOWED_TYPES.includes(type)) {
			return res
				.status(400)
				.json({
					error: `Invalid type. Must be one of: ${ALLOWED_TYPES.join(', ')}`,
				});
		}
		const favorite = await Favorite.create({
			user: req.user._id,
			type,
			githubId: String(githubId),
			name,
			fullName,
			description,
			avatarUrl,
			url,
			stars,
			language,
		});
		res.status(201).json(favorite);
	} catch (err) {
		console.error('POST /favorites error:', err);
		if (err.code === 11000) {
			return res.status(409).json({ error: 'Already in favorites' });
		}
		if (err.name === 'ValidationError') {
			return res.status(422).json({ error: 'Validation failed' });
		}
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Remove a favorite
router.delete('/:id', isAuthenticated, async (req, res) => {
	try {
		const favorite = await Favorite.findOneAndDelete({
			_id: req.params.id,
			user: req.user._id,
		});
		if (!favorite) {
			return res.status(404).json({ error: 'Favorite not found' });
		}
		res.json({ message: 'Removed from favorites' });
	} catch (err) {
		console.error('DELETE /favorites error:', err);
		if (err.name === 'CastError') {
			return res.status(400).json({ error: 'Invalid favorite id' });
		}
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
