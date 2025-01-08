import { APIS_BASE_URL } from "@/apis/main";
import axios from "axios";

export const checkUserByEmail = (email: string): Promise<boolean> => {
	return axios
		.post(`${APIS_BASE_URL}/users/check-email`, { email })
		.then((response) => {
			return response.data.success;
		})
		.catch((error) => {
			console.error("Error checking email:", error);
			return false;
		});
};
