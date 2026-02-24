import { Filter, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Repocard } from '../components/RepoCard';
import { UserCard } from '../components/UserCard';
import { searchGithub } from '../services/api';

export const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const q = searchParams.get('q');
	const [results, setResults] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState(null);
	const [type, setType] = useState('repositories');
	const [sort, setSort] = useState('');
	const [page, setPage] = useState(1);
	const [showFilters, setShowFilters] = useState(false);
	const perPage = 20;
	const prevQuery = useRef('');

	const fetchResults = useCallback(
		(pageNum, { append = false } = {}) => {
			if (!q) return;
			if (append) {
				setLoadingMore(true);
			} else {
				setLoading(true);
				setResults([]);
			}
			setError(null);

			searchGithub(
				q,
				type,
				sort || undefined,
				sort ? 'desc' : undefined,
				perPage,
				pageNum,
			)
				.then((res) => {
					const items = res.data.items || [];
					setTotalCount(res.data.total_count || 0);
					if (append) {
						setResults((prev) => [...prev, ...items]);
					} else {
						setResults(items);
					}
				})
				.catch((err) => setError(err.message))
				.finally(() => {
					setLoading(false);
					setLoadingMore(false);
				});
		},
		[q, type, sort],
	);

	useEffect(() => {
		if (!q) return;
		setPage(1);
		prevQuery.current = q;
		fetchResults(1);
	}, [fetchResults, q]);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchResults(nextPage, { append: true });
	};

	const hasMore = results.length < totalCount;

	return (
		<div className={'max-w-6xl mx-auto px-4 py-8'}>
			<div className={'flex items-center justify-between mb-6'}>
				<div>
					<h1 className={'text-3xl font-bold text-white'}>
						{q ? `Results for "${q}"` : 'Search'}
					</h1>
					{totalCount > 0 && (
						<p className={'text-gray-500 text-sm mt-1'}>
							{totalCount.toLocaleString()} results found
						</p>
					)}
				</div>
				<div className={'flex items-center gap-3'}>
					<button
						type='button'
						onClick={() => setShowFilters(!showFilters)}
						className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
							showFilters
								? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
								: 'text-gray-400 hover:text-white bg-gray-800/50 border border-gray-700/50'
						}`}
					>
						<Filter size={14} />
						Filters
					</button>
					<div
						className={
							'flex bg-gray-800/50 border border-gray-700/50 rounded-lg p-1'
						}
					>
						<button
							type='button'
							onClick={() => setType('repositories')}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
								type === 'repositories'
									? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							Repositories
						</button>
						<button
							type='button'
							onClick={() => setType('users')}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
								type === 'users'
									? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							Users
						</button>
					</div>
				</div>
			</div>

			{/* Filters Panel */}
			{showFilters && type === 'repositories' && (
				<div
					className={
						'bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 mb-6 flex flex-wrap gap-3'
					}
				>
					<div>
						<label
							htmlFor='sort-select'
							className={'block text-xs text-gray-500 mb-1'}
						>
							Sort by
						</label>
						<select
							id='sort-select'
							value={sort}
							onChange={(e) => setSort(e.target.value)}
							className={
								'bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500'
							}
						>
							<option value=''>Best match</option>
							<option value='stars'>Stars</option>
							<option value='forks'>Forks</option>
							<option value='updated'>Recently updated</option>
						</select>
					</div>
				</div>
			)}

			{loading && (
				<div className={'flex items-center justify-center py-20'}>
					<div
						className={
							'w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'
						}
					/>
				</div>
			)}

			{error && (
				<div
					className={
						'bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400'
					}
				>
					{error}
				</div>
			)}

			{!loading && !error && results.length === 0 && q && (
				<div className={'text-center py-20'}>
					<Search
						size={48}
						className={'mx-auto text-gray-600 mb-4'}
					/>
					<p className={'text-gray-400 text-lg'}>
						No results found for &ldquo;{q}&rdquo;
					</p>
				</div>
			)}

			<div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
				{results.map((item) =>
					type === 'users' ? (
						<UserCard key={item.id} user={item} />
					) : (
						<Repocard key={item.id} repo={item} />
					),
				)}
			</div>

			{/* Load More */}
			{!loading && hasMore && results.length > 0 && (
				<div className={'flex justify-center mt-10'}>
					<button
						type='button'
						onClick={handleLoadMore}
						disabled={loadingMore}
						className={
							'px-8 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-white hover:border-gray-600 transition-all duration-200 font-medium'
						}
					>
						{loadingMore ? (
							<span className={'flex items-center gap-2'}>
								<div
									className={
										'w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'
									}
								/>
								Loading...
							</span>
						) : (
							`Load more (${results.length} of ${totalCount.toLocaleString()})`
						)}
					</button>
				</div>
			)}
		</div>
	);
};
