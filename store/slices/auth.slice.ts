import {
	isValidEmail,
	isValidPassword,
	isValidUsername,
	passwordsMatch,
} from "@/lib/utils/authValidation.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export interface AuthFormState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	isLogin: boolean;
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
		validateForm(state) {
			if (!isValidEmail(state.email)) {
				state.emailError = "Invalid email format!";
			} else {
				state.emailError = "";
			}

			if (!isValidPassword(state.password)) {
				state.passwordError =
					"Password must be at least 12 characters, contain one uppercase, one number, and one special character!";
			} else {
				state.passwordError = "";
			}

			if (state.confirmPassword !== state.password) {
				state.confirmPasswordError = "Passwords do not match!";
			} else {
				state.confirmPasswordError = "";
			}
		},

		resetForm(state) {
			state.username = "";
			state.email = "";
			state.password = "";
			state.confirmPassword = "";
			state.emailError = "";
			state.passwordError = "";
			state.confirmPasswordError = "";
		},
	},
});

export const {
	setUsername,
	setEmail,
	setPassword,
	setConfirmPassword,
	validateForm,
	resetForm,
} = authSlice.actions;
export default authSlice.reducer;
