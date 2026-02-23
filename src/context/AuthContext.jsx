import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setError(null);
				const res = await fetch(`${API_BASE}/auth/me`, {
					credentials: 'include',
				});
				if (res.ok) {
					const data = await res.json();
					setUser(data);
				} else {
					setUser(null);
				}
			} catch (err) {
				setError(err.message);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const login = () => {
		window.location.href = `${API_BASE}/auth/github`;
	};

	const logout = async () => {
		try {
			await fetch(`${API_BASE}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});
		} catch (err) {
			console.error(err);
		}
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, error, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
