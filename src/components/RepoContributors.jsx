export function RepoContributors({ contributors }) {
	if (!contributors || contributors.length === 0) return null;
	return (
		<div>
			<h2>Contributors</h2>
			<ul>
				{contributors.map((c) => (
					<li key={c.id}>{c.login}</li>
				))}
			</ul>
		</div>
	);
}
