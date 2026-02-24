import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { getRepoReadme } from '../services/api';

export function RepoReadme({ owner, name }) {
	const [readme, setReadme] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		getRepoReadme(owner, name)
			.then((res) => setReadme(res.data))
			.catch((err) => {
				if (err.response?.status === 404) {
					setError('No README found');
				} else {
					setError(err.message);
				}
			})
			.finally(() => setLoading(false));
	}, [owner, name]);

	if (loading) {
		return (
			<div className={'flex items-center justify-center py-10'}>
				<div
					className={
						'w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'
					}
				/>
			</div>
		);
	}

	if (error) {
		return <p className={'text-gray-500 text-sm'}>{error}</p>;
	}

	if (!readme) return null;

	return (
		<div>
			<div className={'flex items-center gap-2 mb-4'}>
				<BookOpen size={18} className={'text-purple-400'} />
				<h3 className={'text-lg font-semibold text-white'}>README</h3>
			</div>
			<div
				className={
					'prose prose-invert prose-sm max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-purple-300 prose-pre:bg-transparent prose-pre:p-0'
				}
			>
				<Markdown
					remarkPlugins={[remarkGfm]}
					components={{
						code({ className, children, node, ...rest }) {
							const match = /language-(\w+)/.exec(
								className || '',
							);
							const isBlock = String(children).includes('\n');
							return !isBlock && !match ? (
								<code
									className={
										'bg-gray-700/50 px-1.5 py-0.5 rounded text-sm'
									}
									{...rest}
								>
									{children}
								</code>
							) : (
								<SyntaxHighlighter
									style={oneDark}
									language={match?.[1] || 'text'}
									PreTag='div'
									customStyle={{
										borderRadius: '0.75rem',
										fontSize: '0.85rem',
										margin: '1rem 0',
									}}
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							);
						},
						img({ src, alt, node, ...rest }) {
							return (
								<img
									src={src}
									alt={alt || ''}
									className={'max-w-full rounded-lg'}
									{...rest}
									loading='lazy'
								/>
							);
						},
						table({ children, node, ...rest }) {
							return (
								<div className={'overflow-x-auto'}>
									<table
										className={
											'border-collapse border border-gray-700'
										}
										{...rest}
									>
										{children}
									</table>
								</div>
							);
						},
						th({ children, node, ...rest }) {
							return (
								<th
									className={
										'border border-gray-700 px-3 py-2 bg-gray-800/50 text-left'
									}
									{...rest}
								>
									{children}
								</th>
							);
						},
						td({ children, node, ...rest }) {
							return (
								<td
									className={
										'border border-gray-700 px-3 py-2'
									}
									{...rest}
								>
									{children}
								</td>
							);
						},
					}}
				>
					{readme}
				</Markdown>
			</div>
		</div>
	);
}
