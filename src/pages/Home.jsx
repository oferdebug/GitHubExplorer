import {
	Code2,
	GitFork,
	Github,
	Heart,
	Search,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { searchGithub } from '../services/api';

export function Home() {
	const [trending, setTrending] = useState([]);

	useEffect(() => {
		searchGithub('stars:>50000', 'repositories')
			.then((res) => setTrending((res.data.items || []).slice(0, 6)))
			.catch(() => {});
	}, []);

	return (
		<div className={'min-h-screen'}>
			{/* Hero Section */}
			<div className={'relative overflow-hidden'}>
				{/* Gradient orbs */}
				<div
					className={
						'absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow'
					}
				/>
				<div
					className={
						'absolute top-20 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse-glow animation-delay-200'
					}
				/>
				<div
					className={
						'absolute -bottom-20 left-1/2 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl animate-pulse-glow animation-delay-400'
					}
				/>

				<div
					className={
						'relative z-10 flex flex-col items-center pt-16 pb-20 px-4'
					}
				>
					<div className={'animate-float mb-8'}>
						<div className={'relative'}>
							<div
								className={
									'absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-xl opacity-50'
								}
							/>
							<div
								className={
									'relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl border border-gray-700/50'
								}
							>
								<Github size={64} className={'text-white'} />
							</div>
						</div>
					</div>

					<h1
						className={
							'text-5xl md:text-7xl font-extrabold text-center mb-4 animate-fade-in-up'
						}
					>
						<span
							className={
								'bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent'
							}
						>
							GitHub Explorer
						</span>
					</h1>

					<p
						className={
							'text-gray-400 text-lg md:text-xl text-center max-w-2xl mb-10 animate-fade-in-up animation-delay-200'
						}
					>
						Discover repositories, explore developers, and save your
						favorites — all in one beautiful place.
					</p>

					<div
						className={
							'w-full max-w-2xl animate-fade-in-up animation-delay-400'
						}
					>
						<SearchBar />
					</div>

					{/* Quick stats */}
					<div
						className={
							'flex gap-8 mt-12 animate-fade-in-up animation-delay-600'
						}
					>
						<div
							className={'flex items-center gap-2 text-gray-500'}
						>
							<Code2 size={16} />
							<span className={'text-sm'}>330M+ Repos</span>
						</div>
						<div
							className={'flex items-center gap-2 text-gray-500'}
						>
							<Users size={16} />
							<span className={'text-sm'}>100M+ Developers</span>
						</div>
						<div
							className={'flex items-center gap-2 text-gray-500'}
						>
							<Star size={16} />
							<span className={'text-sm'}>Unlimited Stars</span>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className={'max-w-6xl mx-auto px-4 py-16'}>
				<div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
					<div
						className={
							'bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1'
						}
					>
						<div
							className={
								'bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4'
							}
						>
							<Search size={24} className={'text-purple-400'} />
						</div>
						<h3 className={'text-lg font-semibold text-white mb-2'}>
							Smart Search
						</h3>
						<p className={'text-gray-400 text-sm leading-relaxed'}>
							Search across millions of repositories and
							developers with powerful filters.
						</p>
					</div>

					<div
						className={
							'bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1'
						}
					>
						<div
							className={
								'bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4'
							}
						>
							<TrendingUp size={24} className={'text-blue-400'} />
						</div>
						<h3 className={'text-lg font-semibold text-white mb-2'}>
							Explore Trends
						</h3>
						<p className={'text-gray-400 text-sm leading-relaxed'}>
							Stay updated with the most popular and trending
							repositories on GitHub.
						</p>
					</div>

					<div
						className={
							'bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1'
						}
					>
						<div
							className={
								'bg-cyan-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4'
							}
						>
							<Heart size={24} className={'text-cyan-400'} />
						</div>
						<h3 className={'text-lg font-semibold text-white mb-2'}>
							Save Favorites
						</h3>
						<p className={'text-gray-400 text-sm leading-relaxed'}>
							Bookmark repos and developers to build your
							personalized collection.
						</p>
					</div>
				</div>
			</div>

			{/* Trending Section */}
			{trending.length > 0 && (
				<div className={'max-w-6xl mx-auto px-4 pb-20'}>
					<div className={'flex items-center gap-3 mb-8'}>
						<TrendingUp size={24} className={'text-yellow-400'} />
						<h2 className={'text-2xl font-bold text-white'}>
							Trending Repositories
						</h2>
					</div>
					<div
						className={
							'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
						}
					>
						{trending
							.filter((repo) => repo.owner)
							.map((repo) => (
								<Link
									key={repo.id}
									to={`/repos/${repo.owner.login}/${repo.name}`}
									className={
										'group bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5'
									}
								>
									<div
										className={
											'flex items-center gap-3 mb-3'
										}
									>
										<img
											src={repo.owner.avatar_url}
											alt={repo.owner.login}
											className={'w-8 h-8 rounded-full'}
										/>
										<span
											className={
												'text-sm text-gray-400 truncate'
											}
										>
											{repo.owner?.login}
										</span>
									</div>
									<h3
										className={
											'font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 truncate'
										}
									>
										{repo.name}
									</h3>
									<p
										className={
											'text-sm text-gray-500 line-clamp-2 mb-4'
										}
									>
										{repo.description}
									</p>
									<div
										className={
											'flex items-center gap-4 text-xs text-gray-500'
										}
									>
										<span
											className={
												'flex items-center gap-1'
											}
										>
											<Star
												size={14}
												className={'text-yellow-500'}
											/>
											{(
												repo.stargazers_count || 0
											).toLocaleString()}
										</span>
										<span
											className={
												'flex items-center gap-1'
											}
										>
											<GitFork size={14} />
											{(
												repo.forks_count || 0
											).toLocaleString()}
										</span>
										{repo.language && (
											<span
												className={
													'bg-gray-700/50 px-2 py-0.5 rounded-full'
												}
											>
												{repo.language}
											</span>
										)}
									</div>
								</Link>
							))}
					</div>
				</div>
			)}
		</div>
	);
}
