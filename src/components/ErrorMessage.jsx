const ErrorMessage = ({ message, className = '' }) =>
	!message ? null : (
		<div
			className={`max-w-2xl mx-auto mb-8 p-6 bg-red-500/90 border-red-700 rounded-lg text-red-200 ${className}`}
		>
			{message}
		</div>
	);

export default ErrorMessage;
