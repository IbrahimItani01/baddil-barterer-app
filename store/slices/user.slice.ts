import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	isLoggedIn: boolean;
	hasOnboarded: boolean;
	userName: string | null;
}

const initialState: UserState = {
	isLoggedIn: false,
	hasOnboarded: false,
	userName: null,
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
		setUserName(state, action) {
			state.userName = action.payload;
		},
	},
});

export const { login, logout, completeOnboarding, setOnboarding, setUserName } =
	userSlice.actions;
export default userSlice.reducer;
