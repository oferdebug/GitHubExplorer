import { Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
	return (
		<footer className={'border-t border-gray-800/50 bg-gray-900/50 mt-20'}>
			<div className={'max-w-6xl mx-auto px-4 py-12'}>
				<div className={'grid grid-cols-1 md:grid-cols-3 gap-8'}>
					<div>
						<div className={'flex items-center gap-2 mb-4'}>
							<div
								className={
									'bg-linear-to-br from-purple-500 to-blue-500 p-1.5 rounded-lg'
								}
							>
								<Github size={18} className={'text-white'} />
							</div>
							<span className={'font-bold text-white'}>
								GitHub Explorer
							</span>
						</div>
						<p className={'text-sm text-gray-500 leading-relaxed'}>
							Discover repositories, explore developers, and save
							your favorites.
						</p>
					</div>
					<div>
						<h4
							className={
								'text-sm font-semibold text-gray-300 mb-4'
							}
						>
							Navigation
						</h4>
						<div className={'flex flex-col gap-2'}>
							<Link
								to='/'
								className={
									'text-sm text-gray-500 hover:text-white transition-colors'
								}
							>
								Home
							</Link>
							<Link
								to='/search'
								className={
									'text-sm text-gray-500 hover:text-white transition-colors'
								}
							>
								Search
							</Link>
							<Link
								to='/favorites'
								className={
									'text-sm text-gray-500 hover:text-white transition-colors'
								}
							>
								Favorites
							</Link>
							<Link
								to='/login'
								className={
									'text-sm text-gray-500 hover:text-white transition-colors'
								}
							>
								Sign in
							</Link>
						</div>
					</div>
					<div>
						<h4
							className={
								'text-sm font-semibold text-gray-300 mb-4'
							}
						>
							Resources
						</h4>
						<div className={'flex flex-col gap-2'}>
							<a
								href='https://github.com'
								target='_blank'
								rel='noopener noreferrer'
								className={
									'text-sm text-gray-500 hover:text-white transition-colors'
								}
							>
								GitHub
							</a>
							<a
								href='https://docs.github.com/en/rest'
								target='_blank'
								rel='noopener noreferrer'
								className={
									'text-sm text-gray-500 hover:text-white transition-colors'
								}
							>
								GitHub API Docs
							</a>
						</div>
					</div>
				</div>
				<div
					className={
						'border-t border-gray-800/50 mt-8 pt-8 flex items-center justify-between'
					}
				>
					<p className={'text-xs text-gray-600'}>
						&copy; {new Date().getFullYear()} GitHub Explorer. Built
						with React & Tailwind CSS.
					</p>
					<p
						className={
							'text-xs text-gray-600 flex items-center gap-1'
						}
					>
						Made with <Heart size={12} className={'text-red-500'} />{' '}
						by oferdebug
					</p>
				</div>
			</div>
		</footer>
	);
}
