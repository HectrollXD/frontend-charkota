//-------------------------------------------------------------------------------------------------- Imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Porducts from './views/warehouse/products/Porducts';
import Providers from './views/warehouse/providers/Providers';
import Families from './views/animals/families/Families';
import Breeds from './views/animals/breeds/Breeds';
import Pets from './views/ownersandpets/pets/Pets';
import Owners from './views/ownersandpets/owners/Owners';
import Dates from './views/dates/Dates';
import Sells from './views/sells/Sells';
import CreateProvider from './views/warehouse/providers/CreateProvider';
import CreateProducts from './views/warehouse/products/CreateProducts';
import CreateFamilies from './views/animals/families/CreateFamilies';
import CreateBreeds from './views/animals/breeds/CreateBreeds';
import CreateOwners from './views/ownersandpets/owners/CreateOwners';
import CreatePets from './views/ownersandpets/pets/CreatePets';



//-------------------------------------------------------------------------------------------------- App
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/warehouse/products' element={<Porducts/>}/>
				<Route path='/warehouse/products/create-new' element={<CreateProducts/>}/>
				<Route path='/warehouse/providers' element={<Providers/>}/>
				<Route path='/warehouse/providers/create-new' element={<CreateProvider/>}/>
				<Route path='/animals/families' element={<Families/>}/>
				<Route path='/animals/families/create-new' element={<CreateFamilies/>}/>
				<Route path='/animals/breeds' element={<Breeds/>}/>
				<Route path='/animals/breeds/create-new' element={<CreateBreeds/>}/>
				<Route path='/patients/pets' element={<Pets/>}/>
				<Route path='/patients/pets/create-new' element={<CreatePets/>}/>
				<Route path='/patients/pets/owners' element={<Owners/>}/>
				<Route path='/patients/pets/owners/create-new' element={<CreateOwners/>}/>
				<Route path='/dates' element={<Dates/>}/>
				<Route path='/sells' element={<Sells/>}/>
			</Routes>
		</BrowserRouter>
	);
}



//-------------------------------------------------------------------------------------------------- Exports
export default App;
