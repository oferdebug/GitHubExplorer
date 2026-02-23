/** biome-ignore-all lint/correctness/useJsxKeyInIterable: keys handled inline */
/** biome-ignore-all assist/source/organizeImports: manual order preferred */
import { useState } from 'react';
import { searchGithub } from '../services/api';
import { useEffect } from 'react';
import { UserCard } from '../components/UserCard';
import { useSearchParams } from 'react-router-dom';
import { Repocard } from '../components/RepoCard';

export const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const q = searchParams.get('q');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [type, setType] = useState('repositories');

	useEffect(() => {
		if (!q) return;
		setLoading(true);
		setError(null);
		searchGithub(q, type)
			.then((res) => setResults(res.data.items || []))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [q, type]);

	return (
		<div>
			<h1>Search Results</h1>
			<div className={'flex gap-4 mb-4'}>
				<button
					type='button'
					onClick={() => setType('repositories')}
					className={`px-6 py-4 rounded-lg font-semibold ${type === 'repositories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
				>
					Repositories
				</button>
				<button
					type='button'
					onClick={() => setType('users')}
					className={`px-6 py-4 rounded-lg font-semibold ${type === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
				>
					Users
				</button>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{results.length > 0 && <p>Found {results.length} results</p>}
			{results.map((item) => {
				return type === 'users' ? (
					<UserCard key={item.id} user={item} />
				) : (
					<Repocard key={item.id} repo={item} />
				);
			})}
		</div>
	);
};
