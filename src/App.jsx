import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import AuthProvider from './context/AuthContext';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import RepoDetail from './pages/RepoDetail';
import { SearchResults } from './pages/SearchResults';
import { UserProfile } from './pages/UserProfile';
import './App.css';
function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<main className={'min-h-screen'}>
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
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
				<Toaster
					theme='dark'
					position='bottom-right'
					richColors
					closeButton
				/>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
