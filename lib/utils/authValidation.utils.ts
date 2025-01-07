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
