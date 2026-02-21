const GITHUB_API_BASE = 'https://api.github.com';

const handleResponse = async (response, errorMsg) => {
	if (!response.ok) {
		if (response.status === 404 && errorMsg.includes('user'))
			throw new Error(
				'User Not Found!, please check the username and try again.',
			);
		throw new Error(errorMsg);
	}
	return await response.json();
};

export const fetchUserProfile = async (username) => {
	const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
	return handleResponse(
		response,
		'Failed To Fetch User Profile,Please Try Again!',
	);
};

export const fetchUserRepos = async (username, page = 1, perPage = 30) => {
	const response = await fetch(
		`${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`,
	);

	return handleResponse(
		response,
		'Failed To Find User Repos,Please Try Again!',
	);
};

export const searchRepositores = async (query, page = 1, perPage = 30) => {
	const params = new URLSearchParams({
		q: query,
		page: page.toString(),
		perPage: perPage.toString(),
		sort,
		order,
	});
	const response = await fetch(
		`${GITHUB_API_BASE}/search/repositories?${params.toString()}`,
	);
	return handleResponse(response, 'Failed To Search Repos,Please Try Again!');
};

export const fetchRepoDetails = async (owner, repo) => {
	const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
	return handleResponse(
		response,
		'Failed To Fetch Repository Details,Please Try Again!',
	);
};
