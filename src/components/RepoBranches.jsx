export function RepoBranches({ branches }) {
	if (!branches || branches.length === 0) return null;
	return (
		<div>
			<h2>Branches</h2>
			<ul>
				{branches.map((b) => (
					<li key={b.name}>{b.name}</li>
				))}
			</ul>
		</div>
	);
}
