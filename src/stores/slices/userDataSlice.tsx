//-------------------------------------------------------------------------------------------------- Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersonData } from "../../types/data";



//-------------------------------------------------------------------------------------------------- Interfaces
interface UserDataSliceProps {
	userId: string;
	username: string;
	userType: string,
	email: string,
	personData: PersonData | null;
	token: string;
	isLogged: boolean;
};



//-------------------------------------------------------------------------------------------------- Vars and consts
const userDataSliceInitialState: UserDataSliceProps = {
	userId: "f786b8ae-eb05-4059-8135-c1e22880d5ea",
	username: "HectrollXD",
	userType: "ADMINISTRATOR",
	email: "hector@localdomain.com",
	personData: null,
	token: "",
	isLogged: false,
};



//-------------------------------------------------------------------------------------------------- Slices
const userDataSlice = createSlice({
	name: "userData",
	initialState: userDataSliceInitialState,
	reducers: {
		setUserData: (state, action: PayloadAction<UserDataSliceProps>) => {
			state.userId = action.payload.userId;
			state.username = action.payload.username;
			state.userType = action.payload.userType;
			state.email = action.payload.email;
			state.personData = action.payload.personData;
			state.token = action.payload.token;
			state.isLogged = action.payload.isLogged;
		},
		clearUserData: (state) => {
			state.userId = userDataSliceInitialState.userId;
			state.username = userDataSliceInitialState.username;
			state.userType = userDataSliceInitialState.userType;
			state.email = userDataSliceInitialState.email;
			state.personData = userDataSliceInitialState.personData;
			state.token = userDataSliceInitialState.token;
			state.isLogged = userDataSliceInitialState.isLogged;
		}
	}
});



//-------------------------------------------------------------------------------------------------- Exports
export type {UserDataSliceProps};
export const { setUserData, clearUserData } = userDataSlice.actions;
export const getUserData = (state: any) => state.userData as UserDataSliceProps;
export default userDataSlice.reducer;
