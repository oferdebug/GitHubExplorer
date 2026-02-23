const SearchForm = ({
	value,
	onChange,
	onSubmit,
	placeholder,
	loading,
	buttonText = 'Search',
}) => {
	return (
		<form onSubmit={onSubmit} className={'mb-8'}>
			<div className={'flex gap-6 max-w-2xl mx-auto'}>
				<input
					type='text'
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					aria-label={placeholder || 'Search'}
					className={
						'flex-1 px-8 py-6 bg-gray-700 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
					}
				/>
				<button
					type='submit'
					disabled={loading}
					className={
						'px-8 py-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200'
					}
				>
					{loading ? 'Searching...' : buttonText}
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
