import { Heart, Star, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { getFavorites, removeFavorite } from '../services/api';

export function Favorites() {
	const { user } = useAuth();
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		if (!user) {
			setLoading(false);
			return;
		}
		getFavorites()
			.then((res) => setFavorites(res.data))
			.catch((err) => {
				console.error(err);
				toast.error('Failed to load favorites');
			})
			.finally(() => setLoading(false));
	}, [user]);

	const handleRemove = async (id) => {
		try {
			await removeFavorite(id);
			setFavorites((prev) => prev.filter((f) => f._id !== id));
			toast.success('Removed from favorites');
		} catch (err) {
			console.error('Failed to remove favorite:', err);
			toast.error('Failed to remove favorite');
		}
	};

	const filtered =
		filter === 'all'
			? favorites
			: favorites.filter((f) => f.type === filter);

	if (!user) {
		return (
			<div className={'max-w-6xl mx-auto px-4 text-center py-20'}>
				<Heart size={48} className={'mx-auto text-gray-600 mb-4'} />
				<h1 className={'text-2xl font-bold text-white mb-2'}>
					Sign in to see your favorites
				</h1>
				<p className={'text-gray-500 mb-8'}>
					Save repositories and users you want to come back to.
				</p>
				<Link
					to='/login'
					className={
						'px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200'
					}
				>
					Sign in
				</Link>
			</div>
		);
	}

	if (loading) {
		return (
			<div className={'flex items-center justify-center py-20'}>
				<div
					className={
						'w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'
					}
				/>
			</div>
		);
	}

	return (
		<div className={'max-w-6xl mx-auto px-4 py-8'}>
			<div className={'flex items-center justify-between mb-8'}>
				<h1 className={'text-3xl font-bold text-white'}>Favorites</h1>
				<div
					className={
						'flex bg-gray-800/50 border border-gray-700/50 rounded-lg p-1'
					}
				>
					{['all', 'repo', 'user'].map((t) => (
						<button
							key={t}
							type='button'
							onClick={() => setFilter(t)}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
								filter === t
									? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							{t === 'all'
								? 'All'
								: t === 'repo'
									? 'Repos'
									: 'Users'}
						</button>
					))}
				</div>
			</div>

			{filtered.length === 0 ? (
				<div className={'text-center py-20'}>
					<Heart size={48} className={'mx-auto text-gray-600 mb-4'} />
					<p className={'text-gray-400'}>
						{favorites.length === 0
							? 'No favorites yet. Start exploring and save what you like!'
							: 'No favorites match this filter.'}
					</p>
				</div>
			) : (
				<div className={'grid gap-3'}>
					{filtered.map((fav) => (
						<div
							key={fav._id}
							className={
								'group bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 flex items-center gap-4 hover:border-gray-600 transition-all duration-300'
							}
						>
							{fav.avatarUrl && (
								<img
									src={fav.avatarUrl}
									alt={fav.name}
									className={
										'w-10 h-10 rounded-full object-cover'
									}
								/>
							)}
							<div className={'flex-1 min-w-0'}>
								<Link
									to={
										fav.type === 'repo'
											? `/repos/${fav.fullName}`
											: `/users/${fav.name}`
									}
									className={
										'text-white font-semibold hover:text-blue-400 transition-colors'
									}
								>
									{fav.fullName || fav.name}
								</Link>
								{fav.description && (
									<p
										className={
											'text-sm text-gray-500 truncate'
										}
									>
										{fav.description}
									</p>
								)}
								<div
									className={
										'flex items-center gap-3 mt-1 text-xs text-gray-500'
									}
								>
									<span
										className={
											'bg-gray-700/50 px-2 py-0.5 rounded-full'
										}
									>
										{fav.type === 'repo'
											? 'Repository'
											: 'User'}
									</span>
									{fav.stars != null && (
										<span
											className={
												'flex items-center gap-1'
											}
										>
											<Star
												size={12}
												className={'text-yellow-500'}
											/>{' '}
											{fav.stars.toLocaleString()}
										</span>
									)}
									{fav.language && (
										<span>{fav.language}</span>
									)}
								</div>
							</div>
							<button
								type='button'
								onClick={() => handleRemove(fav._id)}
								className={
									'p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 opacity-40 group-hover:opacity-100'
								}
								title='Remove from favorites'
							>
								<Trash2 size={18} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
