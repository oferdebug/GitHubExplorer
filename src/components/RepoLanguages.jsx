import { Code2 } from 'lucide-react';

const LANG_COLORS = {
	JavaScript: '#f1e05a',
	TypeScript: '#3178c6',
	Python: '#3572A5',
	Java: '#b07219',
	Go: '#00ADD8',
	Rust: '#dea584',
	Ruby: '#701516',
	PHP: '#4F5D95',
	C: '#555555',
	'C++': '#f34b7d',
	'C#': '#178600',
	Swift: '#F05138',
	Kotlin: '#A97BFF',
	Dart: '#00B4AB',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Shell: '#89e051',
	Astro: '#ff5a03',
};

export function RepoLanguages({ languages }) {
	if (!languages || Object.keys(languages).length === 0) return null;

	const total = Object.values(languages).reduce((sum, v) => sum + v, 0);
	const entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<Code2 size={18} className={'text-purple-400'} />
				<h3 className={'text-lg font-semibold text-white'}>
					Languages
				</h3>
			</div>
			{/* Progress bar */}
			<div className={'flex h-3 rounded-full overflow-hidden mb-4'}>
				{entries.map(([lang, bytes]) => (
					<div
						key={lang}
						style={{
							width: `${(bytes / total) * 100}%`,
							backgroundColor: LANG_COLORS[lang] || '#6b7280',
						}}
						title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`}
					/>
				))}
			</div>
			<div className={'flex flex-wrap gap-3'}>
				{entries.map(([lang, bytes]) => (
					<div
						key={lang}
						className={'flex items-center gap-2 text-sm'}
					>
						<span
							className={'w-3 h-3 rounded-full'}
							style={{
								backgroundColor: LANG_COLORS[lang] || '#6b7280',
							}}
						/>
						<span className={'text-gray-300'}>{lang}</span>
						<span className={'text-gray-500'}>
							{((bytes / total) * 100).toFixed(1)}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
