import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import './App.css';
import { SearchResults } from './pages/SearchResults';
import { UserProfile } from './pages/UserProfile';
import RepoDetail from './pages/RepoDetail';
import { Favorites } from './pages/Favorites';
import { Login } from './pages/Login';
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main className={'max-w-7xl mx-auto px-4 py-6'}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<SearchResults />} />
					<Route path='/users/:username' element={<UserProfile />} />
					<Route
						path='/repos/:owner/:name'
						element={<RepoDetail />}
					/>
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
