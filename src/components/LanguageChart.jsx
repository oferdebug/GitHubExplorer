import { Code2 } from 'lucide-react';
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';

const COLORS = [
	'#a855f7',
	'#3b82f6',
	'#06b6d4',
	'#10b981',
	'#f59e0b',
	'#ef4444',
	'#ec4899',
	'#8b5cf6',
	'#14b8a6',
	'#f97316',
];

export function LanguageChart({ repos }) {
	if (!repos || repos.length === 0) return null;

	const langCounts = {};
	for (const repo of repos) {
		if (repo.language) {
			langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
		}
	}

	const data = Object.entries(langCounts)
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value)
		.slice(0, 10);

	if (data.length === 0) return null;

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<Code2 size={18} className={'text-purple-400'} />
				<h3 className={'text-lg font-semibold text-white'}>
					Languages
				</h3>
			</div>
			<ResponsiveContainer width='100%' height={280}>
				<PieChart>
					<Pie
						data={data}
						cx='50%'
						cy='50%'
						innerRadius={60}
						outerRadius={100}
						paddingAngle={3}
						dataKey='value'
						stroke='none'
					>
						{data.map((entry, index) => (
							<Cell
								key={entry.name}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: '#1f2937',
							border: '1px solid #374151',
							borderRadius: '0.75rem',
							color: '#e5e7eb',
						}}
						formatter={(value, name) => [`${value} repos`, name]}
					/>
					<Legend
						formatter={(value) => (
							<span
								style={{ color: '#9ca3af', fontSize: '0.8rem' }}
							>
								{value}
							</span>
						)}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
