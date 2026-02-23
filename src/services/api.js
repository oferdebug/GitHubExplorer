import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
	withCredentials: true,
});

//Search Users Or Repos
export const searchGithub = (
	q,
	type = 'repositories',
	sort,
	order,
	per_page = 20,
	page = 1,
) => {
	const params = { q, type, per_page, page };
	if (sort) params.sort = sort;
	if (order) params.order = order;
	return api.get('/github/search', { params });
};

//Get User Profile
export const getUser = (username) => {
	return api.get(`/github/users/${username}`);
};

//Get User Repos
export const getUserRepos = (username) => {
	return api.get(`/github/users/${username}/repos`);
};

//Get Repo Details
export const getRepo = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}`);
};

//Get Repo Language
export const getRepoLanguage = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/languages`);
};

export const getRepoContributors = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/contributors`);
};

export const getRepoCommits = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/commits`);
};

export const getRepoBranches = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/branches`);
};

export const getRepoIssues = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/issues`);
};

export const getRepoPulls = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/pulls`);
};

//Get Repo Readme
export const getRepoReadme = (owner, name) => {
	return api.get(`/github/repos/${owner}/${name}/readme`, {
		transformResponse: [(data) => data],
	});
};

// Favorites
export const getFavorites = () => {
	return api.get('/favorites');
};

export const checkFavorite = (type, githubId) => {
	return api.get('/favorites/check', { params: { type, githubId } });
};

export const addFavorite = (data) => {
	return api.post('/favorites', data);
};

export const removeFavorite = (id) => {
	return api.delete(`/favorites/${id}`);
};

export default api;
