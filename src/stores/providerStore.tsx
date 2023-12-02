//-------------------------------------------------------------------------------------------------- Imports
import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./slices/userDataSlice";



//-------------------------------------------------------------------------------------------------- Config store
const configStore = configureStore({
	reducer: {
		userData: userDataSlice
	}
});



//-------------------------------------------------------------------------------------------------- Exports
export default configStore;
