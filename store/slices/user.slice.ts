import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	isLoggedIn: boolean;
	hasOnboarded: boolean;
}

const initialState: UserState = {
	isLoggedIn: false,
	hasOnboarded: false,
};
