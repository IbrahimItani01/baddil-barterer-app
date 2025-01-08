import { APIS_BASE_URL } from "@/apis/main";
import axios from "axios";
import { Alert } from "react-native";

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await axios.post(`${APIS_BASE_URL}/auth/login`, {
			emailOrIdToken: email,
			password,
		});
		// TODO: handle to store jwt
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const registerUser = async (
	username: string | undefined,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post(`${APIS_BASE_URL}/auth/register`, {
			name: username,
			email,
			password,
			user_type: "barterer",
		});
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
export const sendForgetPasswordEmail = async (email: string) => {
	try {
		const response = await axios.post(
			`${APIS_BASE_URL}/firebase/reset-password`,
			{
				email,
			}
		);
		if (response.data.success) {
			Alert.alert("Success!", `${response.data.message}`);
			return true;
		}
	} catch (error) {
		Alert.alert("Failed!", "Password reset email could not be sent.");
		console.error(error);
		return false;
	}
};
