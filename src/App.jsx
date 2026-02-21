import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main className={'max-w-7xl mx-auto px-4 py-6'}>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
