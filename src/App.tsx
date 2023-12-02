//-------------------------------------------------------------------------------------------------- Imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import DefaultLayout from './components/DefaultLayout';



//-------------------------------------------------------------------------------------------------- App
function App() {
	return (
		<DefaultLayout>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</DefaultLayout>
	);
}



//-------------------------------------------------------------------------------------------------- Exports
export default App;
