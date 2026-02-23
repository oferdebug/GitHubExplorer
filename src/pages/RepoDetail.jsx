import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RepoBranches } from '../components/RepoBranches';
import { Repocard } from '../components/RepoCard';
import { RepoCommits } from '../components/RepoCommits';
import { RepoContributors } from '../components/RepoContributors';
import { RepoIssues } from '../components/RepoIssues';
import { RepoLanguages } from '../components/RepoLanguages';
import {
	getRepo,
	getRepoBranches,
	getRepoCommits,
	getRepoContributors,
	getRepoIssues,
	getRepoLanguage,
} from '../services/api';

export default function RepoDetail() {
	const { owner, name } = useParams();
	const [repo, setRepo] = useState(null);
	const [languages, setLanguages] = useState({});
	const [contributors, setContributors] = useState([]);
	const [commits, setCommits] = useState([]);
	const [branches, setBranches] = useState([]);
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		Promise.all([
			getRepo(owner, name),
			getRepoLanguage(owner, name),
			getRepoContributors(owner, name),
			getRepoCommits(owner, name),
			getRepoBranches(owner, name),
			getRepoIssues(owner, name),
		])
			.then(
				([
					repoRes,
					langRes,
					contributorsRes,
					commitsRes,
					branchesRes,
					issuesRes,
				]) => {
					setRepo(repoRes.data);
					setLanguages(langRes.data);
					setContributors(contributorsRes.data);
					setCommits(commitsRes.data);
					setBranches(branchesRes.data);
					setIssues(issuesRes.data);
				},
			)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [owner, name]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!repo) return null;
	return (
		<div>
			<Repocard repo={repo} />
			<RepoLanguages languages={languages} />
			<RepoContributors contributors={contributors} />
			<RepoCommits commits={commits} />
			<RepoBranches branches={branches} />
			<RepoIssues issues={issues} />
		</div>
	);
}
