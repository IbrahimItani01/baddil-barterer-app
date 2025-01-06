import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	isLoggedIn: boolean;
	hasOnboarded: boolean;
}

const initialState: UserState = {
	isLoggedIn: false,
	hasOnboarded: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state) {
			state.isLoggedIn = true;
		},
		logout(state) {
			state.isLoggedIn = false;
		},
		completeOnboarding(state) {
			state.hasOnboarded = true;
		},
		setOnboarding(state, action) {
			state.hasOnboarded = action.payload; // Set onboarding status dynamically
		},
	},
});

