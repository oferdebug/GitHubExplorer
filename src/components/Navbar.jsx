import { Github, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
	return (
		<nav
			className={
				'bg-gray-900 text-white px-6 py-6 flex items-center justify-between'
			}
		>
			<Link
				to='/'
				className={' flex items-center gap-3 text-xl font-bold'}
			>
				<Github size={28} />
				Github Explorer
			</Link>
			<div className={'flex items-center gap-6'}>
				<Link
					to='/search'
					className={'flex items-center gap-2 hover:text-gray-300'}
				>
					<Search size={20} />
					<span>Search</span>
				</Link>
				<Link
					to='/favorites'
					className={'flex items-center gap-2 hover:text-gray-300'}
				>
					<Heart size={20} />
					<span>Favorites</span>
				</Link>
				<Link
					to='/login'
					className={
						'bg-gray-800 px-4 py-2 rounded hover:bg-gray-600'
					}
				>
					Login
				</Link>
			</div>
		</nav>
	);
}
