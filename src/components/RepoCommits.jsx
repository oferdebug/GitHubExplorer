import { GitCommitHorizontal } from 'lucide-react';

export function RepoCommits({ commits }) {
	if (!commits || commits.length === 0) return null;

	const shown = commits.slice(0, 10);

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<GitCommitHorizontal size={18} className={'text-green-400'} />
				<h3 className={'text-lg font-semibold text-white'}>
					Recent Commits
				</h3>
			</div>
			<div className={'space-y-2'}>
				{shown.map((c) => (
					<div
						key={c.sha}
						className={
							'flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors'
						}
					>
						<code
							className={
								'text-xs text-purple-400 bg-gray-700/50 px-2 py-1 rounded font-mono mt-0.5 shrink-0'
							}
						>
							{c.sha?.slice(0, 7)}
						</code>
						<div className={'min-w-0'}>
							<p className={'text-sm text-gray-300 truncate'}>
								{c.commit?.message || '(no message)'}
							</p>
							<p className={'text-xs text-gray-500'}>
								{c.commit?.author?.name}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
