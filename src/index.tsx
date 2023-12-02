//-------------------------------------------------------------------------------------------------- Imports
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configStore from './stores/providerStore';



//-------------------------------------------------------------------------------------------------- Consts
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);



//-------------------------------------------------------------------------------------------------- Render
root.render(
	<Provider store={configStore}>
		<App />
	</Provider>
);



reportWebVitals();
