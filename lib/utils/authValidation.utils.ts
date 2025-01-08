import { AuthFormState } from "@/store/slices/auth.slice";

// sets validation for email
export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

// sets requirements for password
export const isValidPassword = (password: string): boolean => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/;
	return passwordRegex.test(password);
};

export const isValidUsername = (username: string) => username.trim().length > 0;

export const passwordsMatch = (password: string, confirmPassword: string) =>
	password === confirmPassword;

export const validateForm = (state: AuthFormState) => {
	const emailValid = isValidEmail(state.email || "");
	const passwordValid = isValidPassword(state.password || "");
	const usernameValid = state.username ? isValidUsername(state.username) : true;
	const isPasswordsMatch =
		state.password && state.confirmPassword
			? passwordsMatch(state.password, state.confirmPassword)
			: true; // Assume match if not provided

	let validationPayload = {
		isValid: true,
		errors: [] as string[],
	};

	if (state.isLogin) {
		if (!emailValid && !passwordValid) {
			validationPayload.isValid = false;
			validationPayload.errors.push("Invalid email and password");
		} else if (!emailValid) {
			validationPayload.isValid = false;
			validationPayload.errors.push("Invalid email format");
		} else if (!passwordValid) {
			validationPayload.isValid = false;
			validationPayload.errors.push(
				"Password must be at least 12 characters, contain one uppercase letter, one number, and one special character."
			);
		}
	} else {
		if (!usernameValid) validationPayload.errors.push("username");
		if (!emailValid) validationPayload.errors.push("email");
		if (!passwordValid) validationPayload.errors.push("password");
		if (!isPasswordsMatch) validationPayload.errors.push("confirm password");

		if (validationPayload.errors.length > 0) {
			validationPayload.isValid = false;
		}
	}

	return validationPayload;
};
