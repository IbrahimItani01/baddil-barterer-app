import { APIS_BASE_URL } from "@/apis/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const checkUserByEmail = async (email: string): Promise<any> => {
	return axios
		.post(`${APIS_BASE_URL}/users/check-email`, { email })
		.then((response) => {
			return response.data;
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
		.catch((_) => false);
};

export const getUserInfo = async () => {
	const token = await AsyncStorage.getItem("jwtToken");
	const response = await axios.get(`${APIS_BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.data.success) {
		return response.data.data;
	}
};
export const changeProfilePicture = async (
	formData: FormData
): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem("jwtToken");
		if (!token) return;
		const response = await axios.put(
			`${APIS_BASE_URL}/users/me/profile-picture`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data;
	} catch {
		return false;
	}
};

export const updateUserInfo = async (updateData: any): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem("jwtToken");
		if (!token) {
			console.error("No token found");
			return false;
		}

		const response = await axios.put(`${APIS_BASE_URL}/users/me`, updateData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error updating user information:", error);
		return false;
	}
};
