import { GitFork, Star } from 'lucide-react';

export function Repocard({ repo }) {
	return (
		<div
			className={
				'border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer'
			}
		>
			<Link
				to={`/repo/${repo.owner.login}/${repo.name}`}
				className={
					'text-xl font-semibold text-blue-500 hover:underline'
				}
			>
				{repo.full_name}
			</Link>
			<p className={'text-gray-600 mt-2'}>{repo.description}</p>
			<div
				className={'flex items-center gap-6 mt-4 text-sm text-blue-500'}
			>
				<span className={'flex items-center gap-2'}>
					<Star size={20} />
					{repo.stargazers_count}
				</span>
				<span className={'flex items-center gap-2'}>
					<GitFork size={20} />
					{repo.forks_count}
				</span>
			</div>
		</div>
	);
}
