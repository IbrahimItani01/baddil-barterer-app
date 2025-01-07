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
		setIsLogin(state, action: PayloadAction<boolean>) {
			state.isLogin = action.payload;
		},
		validateForm(state) {
			const emailValid = isValidEmail(state.email);
			const passwordValid = isValidPassword(state.password);
			const usernameValid = isValidUsername(state.username);
			const isPasswordsMatch = passwordsMatch(
				state.password,
				state.confirmPassword
			);

			if (state.isLogin) {
				if (!emailValid && !passwordValid) {
					Alert.alert("Invalid email and password!");
				} else if (!emailValid) {
					Alert.alert(
						"Invalid email format!",
						"Please enter a valid email address."
					);
				} else if (!passwordValid) {
					Alert.alert(
						"Invalid password format!",
						"Password must be at least 12 characters, contain one uppercase letter, one number, and one special character."
					);
				}
			} else {
				const invalidFields = [];

				if (!usernameValid) invalidFields.push("username");
				if (!emailValid) invalidFields.push("email");
				if (!passwordValid) invalidFields.push("password");
				if (!isPasswordsMatch) invalidFields.push("confirm password");

				if (invalidFields.length > 1) {
					Alert.alert(
						"Multiple invalid fields!",
						`Please fix the following: ${invalidFields.join(", ")}.`
					);
				} else if (invalidFields.length === 1) {
					const field = invalidFields[0];
					Alert.alert(`Invalid ${field}!`, `Please enter a valid ${field}.`);
				}
			}
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
	validateForm,
	resetForm,
	setIsLogin,
} = authSlice.actions;
export default authSlice.reducer;
