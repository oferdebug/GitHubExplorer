import { Github, Shield, Star, Zap } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export function Login() {
	const handleGitHubLogin = () => {
		window.location.href = `${API_BASE}/auth/github`;
	};

	return (
		<div className={'flex items-center justify-center min-h-[80vh] px-4'}>
			<div className={'relative max-w-md w-full'}>
				<div
					className={
						'absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-20'
					}
				/>
				<div
					className={
						'relative bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-10 text-center'
					}
				>
					<div className={'flex justify-center mb-8'}>
						<div className={'relative'}>
							<div
								className={
									'absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-50'
								}
							/>
							<div
								className={
									'relative bg-gradient-to-br from-gray-700 to-gray-800 p-5 rounded-2xl border border-gray-600/50'
								}
							>
								<Github size={40} className={'text-white'} />
							</div>
						</div>
					</div>
					<h1 className={'text-3xl font-bold text-white mb-2'}>
						Welcome Back
					</h1>
					<p className={'text-gray-400 mb-8'}>
						Sign in with GitHub to unlock all features
					</p>
					<button
						type='button'
						onClick={handleGitHubLogin}
						className={
							'w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 mb-8'
						}
					>
						<Github size={20} />
						Sign in with GitHub
					</button>
					<div className={'grid grid-cols-3 gap-4 text-center'}>
						<div>
							<Star
								size={18}
								className={'mx-auto text-yellow-400 mb-1'}
							/>
							<span className={'text-xs text-gray-500'}>
								Save Favorites
							</span>
						</div>
						<div>
							<Zap
								size={18}
								className={'mx-auto text-blue-400 mb-1'}
							/>
							<span className={'text-xs text-gray-500'}>
								Fast Search
							</span>
						</div>
						<div>
							<Shield
								size={18}
								className={'mx-auto text-green-400 mb-1'}
							/>
							<span className={'text-xs text-gray-500'}>
								Secure OAuth
							</span>
						</div>
					</div>
					<p className={'text-xs text-gray-600 mt-8'}>
						We only access your public profile information.
					</p>
				</div>
			</div>
		</div>
	);
}
