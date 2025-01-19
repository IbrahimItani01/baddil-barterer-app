import { APIS_BASE_URL } from "@/apis/main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
interface AddItemToWalletPayload {
	name: string;
	description: string;
	categoryId: string;
	subcategoryId: string;
	condition: string;
	locationId: string;
	files: File[];
}

export const fetchNonUserItems = async () => {
	try {
		const token = await AsyncStorage.getItem("jwtToken");
		const response = await axios.get(
			`${APIS_BASE_URL}/wallet/items/not-owned`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.data.success) {
			return response.data.data;
		} else {
			throw new Error(response.data.message || "Failed to fetch items");
		}
	} catch (error) {
		console.error("Error fetching items not owned by the user:", error);
		throw error;
	}
};

export const fetchUserItems = async (userId?: string) => {
	try {
		const token = await AsyncStorage.getItem("jwtToken");
		const endpoint = userId
			? `${APIS_BASE_URL}/wallet/items/user/${userId}`
			: `${APIS_BASE_URL}/wallet/items/user`;

		const response = await axios.get(endpoint, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.data.success) {
			return response.data.data;
		} else {
			throw new Error(response.data.message || "Failed to fetch user items");
		}
	} catch (error) {
		console.error("Error fetching user wallet items:", error);
		throw error;
	}
};

export const addItemToWallet = async (payload: AddItemToWalletPayload) => {
	try {
		if (payload.files.length !== 5) {
			throw new Error("Exactly 5 images must be uploaded.");
		}

		const formData = new FormData();
		formData.append("name", payload.name);
		formData.append("description", payload.description);
		formData.append("categoryId", payload.categoryId);
		formData.append("subcategoryId", payload.subcategoryId);
		formData.append("condition", payload.condition);
		formData.append("locationId", payload.locationId);

		payload.files.forEach((file) => {
			formData.append("files", file);
		});
		const token = await AsyncStorage.getItem("jwtToken");
		const response = await axios.post(
			`${APIS_BASE_URL}/wallet/items`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error adding item to wallet:", error);
		throw error;
	}
};

export const fetchItemDetails = async (itemId: string): Promise<any> => {
	try {
		const response = await axios.get(`${APIS_BASE_URL}/wallet/items/${itemId}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching item details:", error);
		throw error;
	}
};
