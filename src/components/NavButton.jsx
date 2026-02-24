const NavButton = ({ onClick, isActive, children }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			aria-current={isActive ? 'page' : undefined}
			className={`px-6 py-4 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-400 ${isActive ? 'bg-fuchsia-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
		>
			{children}
		</button>
	);
};
export default NavButton;
