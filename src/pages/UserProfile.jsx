import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { Repocard } from '../components/RepoCard';
import { getUser, getUserRepos } from '../services/api';

export function UserProfile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!username) return;
		setLoading(true);
		setError(null);
		Promise.all([getUser(username), getUserRepos(username)])
			.then(([userRes, reposRes]) => {
				setUser(userRes.data);
				setRepos(reposRes.data);
			})
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [username]);

	if (loading) return <p>loading...</p>;
	if (error) return <ErrorMessage message={error} />;
	if (!user) return null;
	return (
		<div>
			{/* profile Header:Avatar,Name,Bio,Stats */}
			<div className={'flex gap-4 mb-4'}>
				<img src={user.avatar_url} alt={user.login} />
				<div>
					<h1>{user.login}</h1>
					<p>{user.bio}</p>
				</div>
			</div>
			{/* Repos List */}
			<div>
				{repos.map((repo) => (
					<Repocard key={repo.id} repo={repo} />
				))}
			</div>
			{/* Sidebar:Stats */}
			<div>
				<p>Followers: {user.followers}</p>
				<p>Following: {user.following}</p>
				<p>Public Repos: {user.public_repos}</p>
			</div>
			{/* Footer */}
			<div>
				<p>Created at: {user.created_at}</p>
				<p>Updated at: {user.updated_at}</p>
			</div>
		</div>
	);
}
