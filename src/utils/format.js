export const formatDate = (date, options = {}) => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...options,
	});
};

export const formatNumber = (num) => {
	if (num == null) return '';
	const n = Number(num);
	if (Number.isNaN(n)) return '';
	if (n >= 1000) {
		return `${(n / 1000).toFixed(1)}k`;
	}
	return n.toString();
};
