import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmedQuery = query.trim();
		if (!trimmedQuery) return;
		navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
	};

	return (
		<form onSubmit={handleSubmit} className={'flex gap-2 items-center'}>
			<input
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				aria-label='Search'
				placeholder='Search repositories or users...'
			/>
			<button type='submit'>Search</button>
		</form>
	);
}
