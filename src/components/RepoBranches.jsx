import { GitBranch } from 'lucide-react';

export function RepoBranches({ branches }) {
	if (!branches || branches.length === 0) return null;

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<GitBranch size={18} className={'text-cyan-400'} />
				<h3 className={'text-lg font-semibold text-white'}>Branches</h3>
				<span className={'text-xs text-gray-500'}>
					({branches.length})
				</span>
			</div>
			<div className={'flex flex-wrap gap-2'}>
				{branches.map((b) => (
					<span
						key={b.name}
						className={
							'px-3 py-1.5 bg-gray-700/40 border border-gray-600/30 rounded-lg text-sm text-gray-300 font-mono'
						}
					>
						{b.name}
					</span>
				))}
			</div>
		</div>
	);
}
