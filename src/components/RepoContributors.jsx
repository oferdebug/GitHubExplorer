import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RepoContributors({ contributors }) {
	if (!contributors || contributors.length === 0) return null;

	const shown = contributors.slice(0, 12);

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<Users size={18} className={'text-blue-400'} />
				<h3 className={'text-lg font-semibold text-white'}>
					Contributors
				</h3>
				<span className={'text-xs text-gray-500'}>
					({contributors.length})
				</span>
			</div>
			<div className={'grid grid-cols-2 gap-2'}>
				{shown.map((c) => (
					<Link
						key={c.id}
						to={`/users/${c.login}`}
						className={
							'flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-700/30 transition-colors'
						}
					>
						<img
							src={c.avatar_url}
							alt={c.login}
							className={'w-7 h-7 rounded-full'}
						/>
						<div className={'min-w-0'}>
							<p className={'text-sm text-gray-300 truncate'}>
								{c.login}
							</p>
							<p className={'text-xs text-gray-500'}>
								{c.contributions} commits
							</p>
						</div>
					</Link>
				))}
			</div>
			{contributors.length > 12 && (
				<p className={'text-xs text-gray-500 mt-3 text-center'}>
					+{contributors.length - 12} more
				</p>
			)}
		</div>
	);
}
