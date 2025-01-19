import { UserStatusEnum } from "@/lib/utils/enums.utils";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	isLoggedIn: boolean;
	hasOnboarded: boolean;
	userName: string | null;
	profilePictureUrl: string;
	status: UserStatusEnum;
	email: string;
}

const initialState: UserState = {
	isLoggedIn: false,
	hasOnboarded: false,
	userName: "",
	profilePictureUrl: "",
	status: UserStatusEnum.Active,
	email: "",
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
			state.hasOnboarded = action.payload;
		},
		setUserName(state, action) {
			state.userName = action.payload;
		},
		setEmail(state, action) {
			state.email = action.payload;
		},
		setProfilePictureUrl(state, action) {
			state.profilePictureUrl = action.payload;
		},
		setStatus(state, action) {
			state.status = action.payload;
		},
	},
});

export const {
	login,
	logout,
	completeOnboarding,
	setOnboarding,
	setUserName,
	setProfilePictureUrl,
	setStatus,
	setEmail,
} = userSlice.actions;
export default userSlice.reducer;
