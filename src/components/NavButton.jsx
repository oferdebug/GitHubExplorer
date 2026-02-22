/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
const NavButton = ({ onClick, isActive, children }) => {
	<button
		onClick={onClick}
		className={`px-6 py-4 rounded-lg font-medium transition-colors ${isActive ? 'bg-fuchsia-900 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
	>
		{children}
	</button>;
};

export default NavButton;
