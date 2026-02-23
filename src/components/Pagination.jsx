const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
	if (totalPages <= 1) return null;
	const btnClass =
		'px-4 py-2 bg-gray-900 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500 text-white rounded-lg transition-colors border border-gray-700';
	return (
		<div className={'flex justify-center items-center gap-4'}>
			<button
				type='button'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1 || loading}
				className={btnClass}
			>
				Previous
			</button>
			<span className={'px-4 py-2 text-gray-400'}>
				Page {currentPage} of {totalPages}
			</span>
			<button
				type='button'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages || loading}
				className={btnClass}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
