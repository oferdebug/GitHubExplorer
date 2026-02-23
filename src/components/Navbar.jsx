import { Github, Heart, LogOut, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
	const { user, loading, logout } = useAuth();

	const handleLogout = async () => {
		await logout();
		toast.success('Logged out successfully');
	};

	return (
		<nav
			className={
				'sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50'
			}
		>
			<div
				className={
					'max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'
				}
			>
				<Link
					to='/'
					className={
						'flex items-center gap-3 text-xl font-bold text-white hover:text-purple-400 transition-colors'
					}
				>
					<div
						className={
							'bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 rounded-lg'
						}
					>
						<Github size={22} className={'text-white'} />
					</div>
					GitHub Explorer
				</Link>
				<div className={'flex items-center gap-2'}>
					<Link
						to='/search'
						className={
							'flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 text-sm font-medium'
						}
					>
						<Search size={16} />
						<span>Search</span>
					</Link>
					<Link
						to='/favorites'
						className={
							'flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 text-sm font-medium'
						}
					>
						<Heart size={16} />
						<span>Favorites</span>
					</Link>
					{loading ? null : user ? (
						<div className={'flex items-center gap-2 ml-2'}>
							<Link
								to={`/users/${user.username}`}
								className={
									'flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200'
								}
							>
								<img
									src={user.avatarUrl}
									alt={user.username}
									className={
										'w-7 h-7 rounded-full ring-2 ring-purple-500/50'
									}
								/>
								<span
									className={
										'text-sm font-medium text-gray-200'
									}
								>
									{user.username}
								</span>
							</Link>
							<button
								type='button'
								onClick={handleLogout}
								className={
									'flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm'
								}
							>
								<LogOut size={15} />
							</button>
						</div>
					) : (
						<Link
							to='/login'
							className={
								'ml-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200'
							}
						>
							Sign in
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
