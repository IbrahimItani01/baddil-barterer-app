import { APIS_BASE_URL } from "@/apis/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const checkUserByEmail = async (email: string): Promise<boolean> => {
	return axios
		.post(`${APIS_BASE_URL}/users/check-email`, { email })
		.then((response) => {
			return response.data.success;
		})
		.catch((error) => {
			console.error(error);
			return false;
		});
};
export const serveUserProfileImage = async () => {
	const token = await AsyncStorage.getItem("jwtToken");
	if (!token) return;
	return await axios
		.get(`${APIS_BASE_URL}/users/profile-picture`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((response) => {
			if (response.data.success) {
				return response.data.data;
			}
		})
		.catch((e) => false);
};

export const getUserInfo = async () => {
	const token = await AsyncStorage.getItem("jwtToken");
	if (!token) return;
	return await axios
		.get(`${APIS_BASE_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((response) => {
			if (response.data.success) {
				return response.data.data;
			}
		})
		.catch((e) => false);
};
