export function RepoIssues({ issues }) {
	if (!issues || issues.length === 0) return null;
	return (
		<div>
			<h2>Issues</h2>
			<ul>
				{issues.map((i) => (
					<li key={i.id}>{i.title}</li>
				))}
			</ul>
		</div>
	);
}
