import { Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
	return (
		<div
			className={
				'flex flex-col items-center justify-center min-h-[70vh] px-4 text-center'
			}
		>
			<Ghost size={80} className={'text-gray-600 mb-6'} />
			<h1 className={'text-6xl font-extrabold text-white mb-4'}>404</h1>
			<p className={'text-xl text-gray-400 mb-2'}>Page not found</p>
			<p className={'text-gray-500 mb-8 max-w-md'}>
				The page you&apos;re looking for doesn&apos;t exist or has been
				moved.
			</p>
			<Link
				to='/'
				className={
					'px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200'
				}
			>
				Back to Home
			</Link>
		</div>
	);
}
