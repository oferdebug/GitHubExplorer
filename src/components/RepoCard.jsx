import { GitFork, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FavoriteButton } from './FavoriteButton';

export function Repocard({ repo }) {
	return (
		<div
			className={
				'group bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5 relative'
			}
		>
			<div className={'absolute top-4 right-4 z-10'}>
				<FavoriteButton
					type='repo'
					githubId={String(repo.id)}
					itemData={{
						name: repo.name,
						fullName: repo.full_name,
						description: repo.description,
						avatarUrl: repo.owner?.avatar_url,
						url: repo.html_url,
						stars: repo.stargazers_count,
						language: repo.language,
					}}
				/>
			</div>
			<div className={'flex items-center gap-3 mb-3'}>
				<img
					src={repo.owner?.avatar_url}
					alt={repo.owner?.login}
					className={'w-6 h-6 rounded-full'}
				/>
				<span className={'text-sm text-gray-500'}>
					{repo.owner?.login}
				</span>
			</div>
			<Link
				to={`/repos/${repo.owner?.login || 'unknown'}/${repo.name}`}
				className={
					'text-lg font-semibold text-white group-hover:text-blue-400 transition-colors'
				}
			>
				{repo.name}
			</Link>
			<p className={'text-gray-400 text-sm mt-2 line-clamp-2'}>
				{repo.description}
			</p>
			<div
				className={'flex items-center gap-4 mt-4 text-xs text-gray-500'}
			>
				<span className={'flex items-center gap-1.5'}>
					<Star size={14} className={'text-yellow-500'} />
					{(repo.stargazers_count || 0).toLocaleString()}
				</span>
				<span className={'flex items-center gap-1.5'}>
					<GitFork size={14} />
					{(repo.forks_count || 0).toLocaleString()}
				</span>
				{repo.language && (
					<span className={'bg-gray-700/50 px-2 py-0.5 rounded-full'}>
						{repo.language}
					</span>
				)}
			</div>
		</div>
	);
}
