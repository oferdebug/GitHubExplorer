import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import AuthProvider from './context/AuthContext';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import RepoDetail from './pages/RepoDetail';
import { SearchResults } from './pages/SearchResults';
import { UserProfile } from './pages/UserProfile';
import './App.css';
function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<main className={'max-w-7xl mx-auto px-4 py-6'}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/search' element={<SearchResults />} />
						<Route
							path='/users/:username'
							element={<UserProfile />}
						/>
						<Route
							path='/repos/:owner/:name'
							element={<RepoDetail />}
						/>
						<Route path='/favorites' element={<Favorites />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</main>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
