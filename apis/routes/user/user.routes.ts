import { APIS_BASE_URL } from "@/apis/main";
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
