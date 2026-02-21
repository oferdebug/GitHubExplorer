const router = require("express").Router();
//const {getUsers,addUser,updateUser,deleteUser}=require('../controllers/userController');
const { Octokit } = require("octokit");
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

//Search Users Or Repos
// GET /api/github/search?q=react&type=users
router.get("/search", async (req, res) => {
	try {
		const {
			q,
			type = "repositories",
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
			type === "users" ? "GET /search/users" : "GET /search/repositories";
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
router.get("/repos/:owner/:name", async (req, res) => {
	try {
		const result = await octokit.request("GET /repos/{owner}/{repo}", {
			owner: req.params.owner,
			repo: req.params.name,
		});
		res.json(result.data);
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
});

module.exports = router;
