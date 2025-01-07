import {
	isValidEmail,
	isValidPassword,
} from "@/lib/utils/authValidation.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
