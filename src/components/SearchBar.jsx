import { Search } from 'lucide-react';
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
		<form onSubmit={handleSubmit} className={'relative w-full'}>
			<div className={'relative group'}>
				<div
					className={
						'absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300'
					}
				/>
				<div
					className={
						'relative flex items-center bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden'
					}
				>
					<Search size={20} className={'ml-5 text-gray-500'} />
					<input
						type='text'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						aria-label='Search GitHub repositories and users'
						placeholder='Search repositories, users, or topics...'
						className={
							'flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg'
						}
					/>
					<button
						type='submit'
						className={
							'mr-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200'
						}
					>
						Search
					</button>
				</div>
			</div>
		</form>
	);
}
