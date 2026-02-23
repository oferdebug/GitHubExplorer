import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FavoriteButton } from './FavoriteButton';

export function UserCard({ user }) {
	if (!user) return null;
	return (
		<div
			className={
				'group bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5 relative'
			}
		>
			<div className={'absolute top-4 right-4 z-10'}>
				<FavoriteButton
					type='user'
					githubId={String(user.id)}
					itemData={{
						name: user.login,
						avatarUrl: user.avatar_url,
						url: user.html_url,
					}}
				/>
			</div>
			<Link
				to={`/users/${user.login}`}
				className={'flex items-center gap-4 flex-1'}
			>
				<img
					src={user.avatar_url}
					alt={user.login}
					className={
						'w-14 h-14 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-purple-500/50 transition-all'
					}
				/>
				<div className={'min-w-0'}>
					<div className={'flex items-center gap-2'}>
						<h3
							className={
								'font-semibold text-white group-hover:text-blue-400 transition-colors'
							}
						>
							{user.login}
						</h3>
						<ExternalLink
							size={14}
							className={
								'text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity'
							}
						/>
					</div>
					{Number.isFinite(user.public_repos) && (
						<span className={'text-xs text-gray-500'}>
							{user.public_repos} repositories
						</span>
					)}
					{user.bio && (
						<p
							className={
								'text-sm text-gray-400 line-clamp-1 mt-1'
							}
						>
							{user.bio}
						</p>
					)}
				</div>
			</Link>
		</div>
	);
}
