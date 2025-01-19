import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthFormState {
	username?: string;
	email: string;
	password: string;
	confirmPassword?: string;
	isLogin?: boolean;
}

const initialState: AuthFormState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	isLogin: true,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUsername(state, action: PayloadAction<string>) {
			state.username = action.payload;
		},
		setEmail(state, action: PayloadAction<string>) {
			state.email = action.payload;
		},
		setPassword(state, action: PayloadAction<string>) {
			state.password = action.payload;
		},
		setConfirmPassword(state, action: PayloadAction<string>) {
			state.confirmPassword = action.payload;
		},
		setIsLogin(state, action: PayloadAction<boolean>) {
			state.isLogin = action.payload;
		},

		resetForm(state) {
			state.username = "";
			state.email = "";
			state.password = "";
			state.confirmPassword = "";
		},
	},
});

export const {
	setUsername,
	setEmail,
	setPassword,
	setConfirmPassword,
	resetForm,
	setIsLogin,
} = authSlice.actions;
export default authSlice.reducer;
