/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
const Pageination = ({ currentPage, totalPages, onPageChange, loading }) => {
	if (totalPages <= 1) return null;
	const btnClass =
		'px-4 py-2 bg-gray-900 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-white-700 text-white rounded-lg transition-colors border border-gray-700';
	return (
		<div className={'flex justify-center items-center gap-4'}>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1 || loading}
				className={btnClass}
			>
				Previous
			</button>
			<span className={'px-4 py-2'}>{currentPage}</span>
		</div>
	);
};

export default Pageination;
