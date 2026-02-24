import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { addFavorite, checkFavorite, removeFavorite } from '../services/api';

export function FavoriteButton({ type, githubId, itemData }) {
	const { user } = useAuth();
	const [favorited, setFavorited] = useState(false);
	const [favId, setFavId] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!user) return;
		checkFavorite(type, githubId)
			.then((res) => {
				setFavorited(res.data.isFavorited);
				if (res.data.favoriteId) setFavId(res.data.favoriteId);
			})
			.catch((err) =>
				console.error('Failed to check favorite status:', err),
			);
	}, [user, type, githubId]);

	const handleToggle = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!user || loading) return;

		setLoading(true);
		try {
			if (favorited) {
				if (!favId) {
					toast.error('Cannot remove: missing favorite ID');
					return;
				}
				await removeFavorite(favId);
				setFavorited(false);
				setFavId(null);
				toast.success('Removed from favorites');
			} else {
				const res = await addFavorite({ type, githubId, ...itemData });
				setFavorited(true);
				setFavId(res.data._id);
				toast.success('Added to favorites');
			}
		} catch (err) {
			const msg =
				err.response?.data?.error || err.message || 'Unknown error';
			console.error('Favorite error:', msg, err);
			toast.error(`Failed: ${msg}`);
		} finally {
			setLoading(false);
		}
	};

	if (!user) return null;

	return (
		<button
			type='button'
			onClick={handleToggle}
			disabled={loading}
			className={`p-2 rounded-full transition-colors ${
				favorited
					? 'text-red-500 hover:text-red-600'
					: 'text-gray-400 hover:text-red-400'
			}`}
			title={favorited ? 'Remove from favorites' : 'Add to favorites'}
		>
			<Heart size={20} fill={favorited ? 'currentColor' : 'none'} />
		</button>
	);
}
