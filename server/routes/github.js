const router = require('express').Router();
//const {getUsers,addUser,updateUser,deleteUser}=require('../controllers/userController');
const { Octokit } = require('octokit');
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

//Search Users Or Repos
// GET /api/github/search?q=react&type=users
router.get('/search', async (req, res) => {
	try {
		const {
			q,
			type = 'repositories',
			sort,
			order,
			per_page = 20,
			page = 1,
		} = req.query;
		if (!q)
			return res
				.status(400)
				.json({ error: 'Missing search query "Q" is required' });

		const endpoint =
			type === 'users' ? 'GET /search/users' : 'GET /search/repositories';
		const result = await octokit.request(endpoint, {
			q,
			sort,
			order,
			per_page,
			page,
		});
		res.json(result.data);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
});

// Get repo details
router.get('/repos/:owner/:name', async (req, res) => {
	try {
		const result = await octokit.request('GET /repos/{owner}/{repo}', {
			owner: req.params.owner,
			repo: req.params.name,
		});
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});

//Get User Profile
router.get('/users/:username', async (req, res) => {
	try {
		const result = await octokit.request('GET /users/{username}', {
			username: req.params.username,
		});
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});

router.get('/users/:username/repos', async (req, res) => {
	try {
		const result = await octokit.request('GET /users/{username}/repos', {
			username: req.params.username,
			per_page: req.query.per_page || 30,
			page: req.query.page || 1,
			sort: req.query.sort || 'updated',
		});
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});

router.get('/users/:username/gists', async (req, res) => {
	try {
		const result = await octokit.request('GET /users/{username}/gists', {
			username: req.params.username,
		});
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});

router.get('/repos/:owner/:name/contributors', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/contributors',
			{
				owner: req.params.owner,
				repo: req.params.name,
			},
		);
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});

// Get repo languages
router.get('/repos/:owner/:name/languages', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/languages',
			{
				owner: req.params.owner,
				repo: req.params.name,
			},
		);
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});
router.get('/repos/:owner/:name/commits', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/commits',
			{
				owner: req.params.owner,
				repo: req.params.name,
			},
		);
		res.json(result.data);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
});

router.get('/repos/:owner/:name/branches', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/branches',
			{
				owner: req.params.owner,
				repo: req.params.name,
			},
		);
		res.json(result.data);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
});

router.get('/repos/:owner/:name/issues', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/issues',
			{
				owner: req.params.owner,
				repo: req.params.name,
			},
		);
		res.json(result.data);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
});

router.get('/repos/:owner/:name/pulls', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/pulls',
			{
				owner: req.params.owner,
				repo: req.params.name,
				per_page: req.query.per_page || 30,
				page: req.query.page || 1,
			},
		);
		res.json(result.data);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
});

router.get('/repos/:owner/:name/readme', async (req, res) => {
	try {
		const result = await octokit.request(
			'GET /repos/{owner}/{repo}/readme',
			{
				owner: req.params.owner,
				repo: req.params.name,
				headers: { Accept: 'application/vnd.github.raw+json' },
			},
		);
		res.type('text/plain').send(result.data);
	} catch (err) {
		if (err.status === 404) {
			return res.status(404).json({ error: 'No README found' });
		}
		res.status(err.status || 500).json({ error: err.message });
	}
});

module.exports = router;
