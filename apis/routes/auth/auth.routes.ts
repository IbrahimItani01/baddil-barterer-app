import { APIS_BASE_URL } from "@/apis/main";
import { login, setStatus } from "@/store/slices/user.slice";
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
		await dispatch(login());
		await dispatch(setStatus(user.status));
		Alert.alert("Success!", "Welcome Back!");
	} catch (error) {
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
		if (response.data.success) {
			Alert.alert(
				"Welcome to Baddil Community!",
				"Login to start you journey!"
			);
			router.replace("/auth");
			return true;
		}
	} catch (error) {
		Alert.alert("Failed!", "Something went wrong, try again!");
		return false;
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
