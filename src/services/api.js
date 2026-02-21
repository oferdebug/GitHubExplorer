import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
	withCredentials: true,
});

//Search Users Or Repos
export const searchGithub = (q, type = 'repositories') =>
	api.get('/github/search', { params: { q, type } });

//Get User Profile
export const getUser = (username) => {
	api.get(`/github/users/${username}`);
};

//Get User Repos
export const getUserRepos = (username) => {
	api.get(`/github/users/${username}/repos`);
};

//Get User Details From Github
export const getRepo = (owner, name) => {
	api.get(`/github/repos/${owner}/${name}`);
};

//Get Repo Language
export const getRepoLanguage = (owner, name) => {
	api.get(`/github/repos/${owner}/${name}/languages`);
};

export default api;
