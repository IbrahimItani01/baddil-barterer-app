// Importing the AuthFormState type from the Redux slice
import { AuthFormState } from "@/store/slices/auth.slice";

// Function to validate email format using a regular expression
export const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
	return emailRegex.test(email); // Test the email string with regex
};

// Function to validate password strength using a regular expression
export const isValidPassword = (password: string): boolean => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/; // Password must contain at least one uppercase, one number, and one special character, with a minimum length of 12 characters
	return passwordRegex.test(password); // Test the password string with regex
};

// Function to validate if a username is non-empty
export const isValidUsername = (username: string) => username.trim().length > 0; // Check if username is not empty after trimming spaces

// Function to check if two passwords match
export const passwordsMatch = (password: string, confirmPassword: string) =>
	password === confirmPassword; // Return true if passwords are identical, else false

// Function to validate the form input values based on the current form state
export const validateForm = (state: AuthFormState) => {
	// Validate individual fields using the helper functions
	const emailValid = isValidEmail(state.email || ""); // Validate email, defaulting to empty string if email is not provided
	const passwordValid = isValidPassword(state.password || ""); // Validate password, defaulting to empty string if not provided
	const usernameValid = state.username ? isValidUsername(state.username) : true; // Validate username if provided
	const isPasswordsMatch =
		state.password && state.confirmPassword
			? passwordsMatch(state.password, state.confirmPassword) // Check if passwords match if both are provided
			: true; // If not in registration, assume match is true

	// Initialize validation payload with a flag and an empty array of errors
	let validationPayload = {
		isValid: true, // Assume the form is valid initially
		errors: [] as string[], // Array to store error messages
	};

	// Check validation rules based on whether it's a login or registration form
	if (state.isLogin) {
		// If it's a login, check only email and password validity
		if (!emailValid && !passwordValid) {
			validationPayload.isValid = false; // Set form as invalid if both email and password are invalid
			validationPayload.errors.push("Invalid email and password"); // Add error message
		} else if (!emailValid) {
			validationPayload.isValid = false; // Set form as invalid if email is invalid
			validationPayload.errors.push("Invalid email format"); // Add error message for email
		} else if (!passwordValid) {
			validationPayload.isValid = false; // Set form as invalid if password is invalid
			validationPayload.errors.push(
				"Password must be at least 12 characters, contain one uppercase letter, one number, and one special character."
			); // Add detailed error message for password
		}
	} else {
		// For registration, check all fields (username, email, password, confirm password)
		if (!usernameValid) validationPayload.errors.push("username"); // If username is invalid, add to error list
		if (!emailValid) validationPayload.errors.push("email"); // If email is invalid, add to error list
		if (!passwordValid) validationPayload.errors.push("password"); // If password is invalid, add to error list
		if (!isPasswordsMatch) validationPayload.errors.push("confirm password"); // If passwords don't match, add to error list

		if (validationPayload.errors.length > 0) {
			validationPayload.isValid = false; // If there are errors, mark the form as invalid
		}
	}

	// Return the validation payload with the final status and any errors
	return validationPayload;
};

// Function to validate if a given profile picture URL matches a specific pattern
export const isValidProfilePictureUrl = (url: string): boolean => {
	const regex = /^http:\/\/localhost:8800\/uploads\/profilepictures\/.+/i; // URL pattern to match local profile picture uploads
	return regex.test(url); // Test the URL string with regex
};
