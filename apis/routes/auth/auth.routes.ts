import { APIS_BASE_URL } from "@/apis/main";
import { login, setUserName } from "@/store/slices/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

export const loginUser = async (
	dispatch: any,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post(`${APIS_BASE_URL}/auth/login`, {
			emailOrIdToken: email,
			password,
		});

		const { token, user } = response.data.data;
		await AsyncStorage.setItem("jwtToken", token);
		dispatch(login());
		dispatch(setUserName(user.name));

		Alert.alert("Success!", "Welcome Back!");
	} catch (error) {
		console.error(error);
		Alert.alert("Failed!", "Login failed, try again!");
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
