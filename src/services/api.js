import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000/api',
	withCredentials: true,
});

//Search Users Or Repos
export const searchGithub = (q, type = 'repositories') => {
	return api.get('/github/search', { params: { q, type } });
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

export default api;
