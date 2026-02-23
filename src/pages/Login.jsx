import { Github } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export function Login() {
	const handleGitHubLogin = () => {
		window.location.href = `${API_BASE}/auth/github`;
	};

	return (
		<div className={'flex items-center justify-center min-h-[70vh]'}>
			<div
				className={
					'bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center'
				}
			>
				<div className={'flex justify-center mb-6'}>
					<div className={'bg-gray-900 p-4 rounded-full'}>
						<Github size={48} className={'text-white'} />
					</div>
				</div>
				<h1 className={'text-3xl font-bold mb-2'}>
					Welcome to GitHub Explorer
				</h1>
				<p className={'text-gray-500 mb-8'}>
					Sign in with your GitHub account to save favorites, track
					repositories, and more.
				</p>
				<button
					type='button'
					onClick={handleGitHubLogin}
					className={
						'w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
					}
				>
					<Github size={20} />
					Sign in with GitHub
				</button>
				<p className={'text-xs text-gray-400 mt-6'}>
					By signing in, you agree to let GitHub Explorer access your
					public profile information.
				</p>
			</div>
		</div>
	);
}
