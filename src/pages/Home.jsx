import { Github } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';

export function Home() {
	return (
		<div
			className={
				'flex flex-col items-center justify-center min-h-[70vh] gap-8'
			}
		>
			<Github size={80} className={'text-gray-800'} />{' '}
			<h1 className={'text-4xl font-bold text-gray-900'}>
				GitHub Explorer
			</h1>
			<p className={'text-gray-800 text-lg'}>
				Search Users, Explore Repos, Save Your Favorites
			</p>{' '}
			<SearchBar />
		</div>
	);
}
