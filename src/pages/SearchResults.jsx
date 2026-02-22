import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchGithub } from '../services/github';

export const Searchresults = () => {
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
			<h1>Searchresults</h1>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{results.length > 0 && <p>Found {results.length} results</p>}
		</div>
	);
};
