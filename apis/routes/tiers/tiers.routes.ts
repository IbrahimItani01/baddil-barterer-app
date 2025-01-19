import { APIS_BASE_URL } from "@/apis/main";
import {
	setCompletedBarters,
	setCurrentTier,
	setProgress,
	setTierRequirement,
} from "@/store/slices/tier.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AppDispatch } from "@/store/store";

export const getUserTier = async (dispatch: AppDispatch) => {
	try {
		const token = await AsyncStorage.getItem("jwtToken");
		if (!token) {
			throw new Error("No token found");
		}

		const response = await axios.get(`${APIS_BASE_URL}/tiers/user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const tierData = response.data.data;

		dispatch(setCurrentTier(tierData.currentTier));
		dispatch(setTierRequirement(tierData.tierRequirement));
		dispatch(setCompletedBarters(tierData.completedBarters));
		dispatch(setProgress(tierData.progress));
	} catch (error) {
		dispatch(setCurrentTier(""));
		dispatch(setTierRequirement(null));
		dispatch(setCompletedBarters(null));
		dispatch(setProgress(0));
	}
};
