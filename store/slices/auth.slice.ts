import {
	isValidEmail,
	isValidPassword,
} from "@/lib/utils/authValidation.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthFormState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	emailError: string;
	passwordError: string;
	confirmPasswordError: string;
}

const initialState: AuthFormState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	emailError: "",
	passwordError: "",
	confirmPasswordError: "",
};

const authSlice = createSlice({
});
