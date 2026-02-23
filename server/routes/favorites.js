const router = require('express').Router();
const Favorite = require('../models/Favorite');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Get all favorites for the logged-in user
router.get('/', isAuthenticated, async (req, res) => {
	try {
		const favorites = await Favorite.find({ user: req.user._id }).sort({
			createdAt: -1,
		});
		res.json(favorites);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Check if an item is favorited
router.get('/check', isAuthenticated, async (req, res) => {
	try {
		const { type, githubId } = req.query;
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
		res.status(500).json({ error: err.message });
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
		const favorite = await Favorite.create({
			user: req.user._id,
			type,
			githubId,
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
		res.status(500).json({ error: err.message });
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
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
