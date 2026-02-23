export function RepoCommits({ commits }) {
	if (!commits || commits.length === 0) return null;
	return (
		<div>
			<h2>Recent Commits</h2>
			<ul>
				{commits.map((c) => (
					<li key={c.sha}>{c.commit.message}</li>
				))}
			</ul>
		</div>
	);
}
