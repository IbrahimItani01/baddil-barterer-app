import { APIS_BASE_URL } from "@/apis/main";
import axios from "axios";

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
