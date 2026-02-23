import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import './App.css';
import { Searchresults } from './pages/SearchResults';
import { Userprofile } from './pages/UserProfile';
import RepoDetail from './pages/RepoDetail';
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main className={'max-w-7xl mx-auto px-4 py-6'}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/search' element={<Searchresults />} />
					<Route path='/users/:username' element={<Userprofile />} />
					<Route
						path='/repos/:owner/:name'
						element={<RepoDetail />}
					/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
