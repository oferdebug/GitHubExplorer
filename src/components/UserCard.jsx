import { Link } from 'react-router-dom';

export function UserCard({ user }) {
	return (
		<Link
			to={`/users/${user.login}`}
			className={
				'border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow'
			}
		>
			<img
				src={user.avatar_url}
				alt={user.login}
				className={'w-16 h-16 rounded-full object-cover'}
			/>
			<div>
				<h3 className={'font-semibold'}>{user.login}</h3>
				<p className={'text-sm text-gray-500'}>View Profile</p>
				{user.public_repos !== undefined && (
					<span className={'text-xs text-gray-400'}>
						{user.public_repos} repositories
					</span>
				)}
				{user.bio && (
					<p className={'text-xs text-gray-600 line-clamp-2'}>
						{user.bio}
					</p>
				)}
			</div>
		</Link>
	);
}
