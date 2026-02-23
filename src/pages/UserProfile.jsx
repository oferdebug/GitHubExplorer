import {
	BookOpen,
	ExternalLink,
	GitFork,
	MapPin,
	Star,
	Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LanguageChart } from '../components/LanguageChart';
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

	if (loading) {
		return (
			<div className={'flex items-center justify-center py-20'}>
				<div
					className={
						'w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'
					}
				/>
			</div>
		);
	}
	if (error) {
		return (
			<div className={'max-w-6xl mx-auto px-4 py-8'}>
				<div
					className={
						'bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400'
					}
				>
					{error}
				</div>
			</div>
		);
	}
	if (!user) return null;

	const totalStars = repos.reduce(
		(sum, r) => sum + (r.stargazers_count || 0),
		0,
	);
	const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

	return (
		<div className={'max-w-6xl mx-auto px-4 py-8'}>
			{/* Profile Header */}
			<div
				className={
					'bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 mb-8'
				}
			>
				<div className={'flex flex-col md:flex-row gap-8 items-start'}>
					<div className={'relative'}>
						<div
							className={
								'absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-30'
							}
						/>
						<img
							src={user.avatar_url}
							alt={user.login}
							className={
								'relative w-32 h-32 rounded-full object-cover ring-4 ring-gray-800'
							}
						/>
					</div>
					<div className={'flex-1'}>
						<div className={'flex items-center gap-3 mb-2'}>
							<h1 className={'text-3xl font-bold text-white'}>
								{user.name || user.login}
							</h1>
							<a
								href={user.html_url}
								target='_blank'
								rel='noopener noreferrer'
								className={
									'text-gray-500 hover:text-blue-400 transition-colors'
								}
							>
								<ExternalLink size={18} />
							</a>
						</div>
						<p className={'text-gray-400 text-lg mb-1'}>
							@{user.login}
						</p>
						{user.bio && (
							<p className={'text-gray-300 mt-3 max-w-2xl'}>
								{user.bio}
							</p>
						)}
						{user.location && (
							<div
								className={
									'flex items-center gap-2 mt-3 text-gray-500'
								}
							>
								<MapPin size={16} />
								<span>{user.location}</span>
							</div>
						)}

						{/* Stats Grid */}
						<div
							className={
								'grid grid-cols-2 md:grid-cols-5 gap-4 mt-6'
							}
						>
							<div
								className={
									'bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-center'
								}
							>
								<p className={'text-xl font-bold text-white'}>
									{(user.public_repos ?? 0).toLocaleString()}
								</p>
								<p
									className={
										'text-xs text-gray-500 flex items-center justify-center gap-1'
									}
								>
									<BookOpen size={12} /> Repos
								</p>
							</div>
							<div
								className={
									'bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-center'
								}
							>
								<p className={'text-xl font-bold text-white'}>
									{user.followers?.toLocaleString()}
								</p>
								<p
									className={
										'text-xs text-gray-500 flex items-center justify-center gap-1'
									}
								>
									<Users size={12} /> Followers
								</p>
							</div>
							<div
								className={
									'bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-center'
								}
							>
								<p className={'text-xl font-bold text-white'}>
									{user.following?.toLocaleString()}
								</p>
								<p className={'text-xs text-gray-500'}>
									Following
								</p>
							</div>
							<div
								className={
									'bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-center'
								}
							>
								<p
									className={
										'text-xl font-bold text-yellow-400'
									}
								>
									{totalStars.toLocaleString()}
								</p>
								<p
									className={
										'text-xs text-gray-500 flex items-center justify-center gap-1'
									}
								>
									<Star size={12} /> Stars
								</p>
							</div>
							<div
								className={
									'bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-center'
								}
							>
								<p className={'text-xl font-bold text-white'}>
									{totalForks.toLocaleString()}
								</p>
								<p
									className={
										'text-xs text-gray-500 flex items-center justify-center gap-1'
									}
								>
									<GitFork size={12} /> Forks
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Language Chart */}
			{repos.length > 0 && (
				<div
					className={
						'bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 mb-8'
					}
				>
					<LanguageChart repos={repos} />
				</div>
			)}

			{/* Repositories */}
			<div className={'flex items-center gap-3 mb-6'}>
				<BookOpen size={20} className={'text-purple-400'} />
				<h2 className={'text-xl font-bold text-white'}>Repositories</h2>
				<span className={'text-sm text-gray-500'}>
					({repos.length})
				</span>
			</div>
			<div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
				{repos.map((repo) => (
					<Repocard key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	);
}
