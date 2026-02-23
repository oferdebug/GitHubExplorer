export function RepoLanguages({ languages }) {
	if (!languages || Object.keys(languages).length === 0) return null;
	return (
		<div>
			<h2>Languages</h2>
			<ul>
				{Object.entries(languages).map(([lang, bytes]) => (
					<li key={lang}>
						{lang}: {bytes}
					</li>
				))}
			</ul>
		</div>
	);
}
