import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RepoBranches } from '../components/RepoBranches';
import { Repocard } from '../components/RepoCard';
import { RepoCommits } from '../components/RepoCommits';
import { RepoContributors } from '../components/RepoContributors';
import { RepoIssues } from '../components/RepoIssues';
import { RepoLanguages } from '../components/RepoLanguages';
import { RepoReadme } from '../components/RepoReadme';
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
		let cancelled = false;
		setLoading(true);
		setError(null);
		setRepo(null);
		setLanguages({});
		setContributors([]);
		setCommits([]);
		setBranches([]);
		setIssues([]);
		Promise.allSettled([
			getRepo(owner, name),
			getRepoLanguage(owner, name),
			getRepoContributors(owner, name),
			getRepoCommits(owner, name),
			getRepoBranches(owner, name),
			getRepoIssues(owner, name),
		])
			.then((results) => {
				if (cancelled) return;
				const [
					repoRes,
					langRes,
					contribRes,
					commitsRes,
					branchesRes,
					issuesRes,
				] = results;
				if (repoRes.status === 'fulfilled') setRepo(repoRes.value.data);
				else setError(repoRes.reason?.message || 'Failed to load repo');
				if (langRes.status === 'fulfilled')
					setLanguages(langRes.value.data);
				if (contribRes.status === 'fulfilled')
					setContributors(contribRes.value.data);
				if (commitsRes.status === 'fulfilled')
					setCommits(commitsRes.value.data);
				if (branchesRes.status === 'fulfilled')
					setBranches(branchesRes.value.data);
				if (issuesRes.status === 'fulfilled')
					setIssues(issuesRes.value.data);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [owner, name]);

	if (loading) {
		return (
			<div className={'flex items-center justify-center py-20'}>
				<div
					className={
						'w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'
					}
				/>
			</div>
		);
	}
	if (error) {
		return (
			<div className={'max-w-6xl mx-auto px-4 py-8'}>
				<div
					className={
						'bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400'
					}
				>
					{error}
				</div>
			</div>
		);
	}
	if (!repo) return null;
	return (
		<div className={'max-w-6xl mx-auto px-4 py-8'}>
			<Repocard repo={repo} />
			<div
				className={
					'bg-gray-800/40 border border-gray-700/50 rounded-xl p-6 mt-8'
				}
			>
				<RepoReadme owner={owner} name={name} />
			</div>
			<div className={'grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'}>
				<div
					className={
						'bg-gray-800/40 border border-gray-700/50 rounded-xl p-6'
					}
				>
					<RepoLanguages languages={languages} />
				</div>
				<div
					className={
						'bg-gray-800/40 border border-gray-700/50 rounded-xl p-6'
					}
				>
					<RepoContributors contributors={contributors} />
				</div>
				<div
					className={
						'bg-gray-800/40 border border-gray-700/50 rounded-xl p-6'
					}
				>
					<RepoCommits commits={commits} />
				</div>
				<div
					className={
						'bg-gray-800/40 border border-gray-700/50 rounded-xl p-6'
					}
				>
					<RepoBranches branches={branches} />
				</div>
			</div>
			<div
				className={
					'bg-gray-800/40 border border-gray-700/50 rounded-xl p-6 mt-6'
				}
			>
				<RepoIssues issues={issues} />
			</div>
		</div>
	);
}
