import { AlertCircle } from 'lucide-react';

export function RepoIssues({ issues }) {
	if (!issues || issues.length === 0) return null;

	const shown = issues.slice(0, 10);

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<AlertCircle size={18} className={'text-yellow-400'} />
				<h3 className={'text-lg font-semibold text-white'}>
					Open Issues
				</h3>
				<span className={'text-xs text-gray-500'}>
					({issues.length})
				</span>
			</div>
			<div className={'space-y-2'}>
				{shown.map((issue) => (
					<a
						key={issue.id}
						href={issue.html_url}
						target='_blank'
						rel='noopener noreferrer'
						className={
							'flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-700/30 transition-colors group'
						}
					>
						<AlertCircle
							size={16}
							className={'text-green-500 mt-0.5 shrink-0'}
						/>
						<div className={'min-w-0'}>
							<p
								className={
									'text-sm text-gray-300 group-hover:text-blue-400 transition-colors truncate'
								}
							>
								{issue.title}
							</p>
							<div className={'flex items-center gap-2 mt-1'}>
								<span className={'text-xs text-gray-500'}>
									#{issue.number}
								</span>
								{issue.labels?.slice(0, 3).map((label) => {
									const hex = label.color || 'cccccc';
									return (
										<span
											key={label.id}
											className={
												'text-xs px-1.5 py-0.5 rounded-full'
											}
											style={{
												backgroundColor: `#${hex}20`,
												color: `#${hex}`,
												border: `1px solid #${hex}40`,
											}}
										>
											{label.name}
										</span>
									);
								})}
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
