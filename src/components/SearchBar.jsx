import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search?q=${encodeURIComponent(query.trim())}`);
	};

	return (
		<form onSubmit={handleSubmit} className={'flex gap-2 items-center'}>
			<input
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type='submit'>Search</button>
		</form>
	);
}
