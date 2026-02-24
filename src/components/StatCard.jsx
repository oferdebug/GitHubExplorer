const StatCard = ({ label, value }) => {
	return (
		<div className={'bg-gray-900 p-6 rounded-lg'}>
			<div className={'text-gray-300 text-sm mb-2'}>{label}</div>
			<div className={'text-2xl font-bold text-white'}>{value}</div>
		</div>
	);
};

export default StatCard;
