import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
import {
	login,
	logout,
	setOnboarding,
	setProfilePictureUrl,
	setUserName,
} from "@/store/slices/user.slice";
import {
	getUserInfo,
	serveUserProfileImage,
} from "@/apis/routes/user/user.routes";
import { Router } from "expo-router";
import { UserStatusEnum } from "./enums.utils";
import { showAlert } from "./async.utils";
import { BackHandler, Platform } from "react-native";
import { getUserTier } from "@/apis/routes/tiers/tiers.routes";
import { fetchCategories } from "@/apis/routes/categories/categories.routes";
import { setCategories } from "@/store/slices/categories.slice";

export const initializeApp = async (dispatch: Dispatch) => {
	await checkOnboardingStatus(dispatch);
	await checkLoginStatus(dispatch);
	await fetchProfilePicture(dispatch);
	await getUserTier(dispatch);
	await getCategoriesData(dispatch);
	await fetchUserData(dispatch);
};

export const handleNavigation = async (
	router: Router,
	token: string | null,
	onboardedFromStorage: string | null
) => {
	try {
		// Retrieve values from AsyncStorage
		const hasOnboardedFromStorage = onboardedFromStorage === "true";

		if (!token && !hasOnboardedFromStorage) {
			router.replace("/onBoarding");
		} else if (!token && hasOnboardedFromStorage) {
			router.replace("/auth");
		} else {
			router.replace("/(tabs)");
		}
	} catch (error) {
		router.replace("/auth");
	}
};

export const handleStatusNavigation = async (
	status: UserStatusEnum,
	router: Router,
	token: string | null,
	onboardedFromStorage: string | null,
	dispatch: Dispatch
) => {
	if (status === UserStatusEnum.Active) {
		handleNavigation(router, token, onboardedFromStorage);
	} else if (status === UserStatusEnum.Flagged) {
		await showAlert(
			"Warning, Flagged User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		handleNavigation(router, token, onboardedFromStorage);
	} else {
		await showAlert(
			"Can't Access Baddil, Banned User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		dispatch(logout());
		if (Platform.OS === "android") {
			BackHandler.exitApp(); // Close the app on Android
		} else {
			router.replace("/auth");
		}
	}
};

export const checkOnboardingStatus = async (dispatch: Dispatch) => {
	const onboarded = await AsyncStorage.getItem("hasOnboarded");
	dispatch(setOnboarding(onboarded === "true"));
};

export const checkLoginStatus = async (dispatch: Dispatch) => {
	const token = await AsyncStorage.getItem("jwtToken");
	if (token) {
		dispatch(login());
	} else {
		dispatch(logout());
	}
};

export const fetchProfilePicture = async (dispatch: Dispatch) => {
	const profilePictureUrl = await serveUserProfileImage();
	dispatch(setProfilePictureUrl(profilePictureUrl || ""));
};

export const fetchUserData = async (dispatch: Dispatch) => {
	const userData = await getUserInfo();
	dispatch(setUserName(userData.name));
};

export const clearStorageOnDev = async () => {
	if (__DEV__) {
		try {
			await AsyncStorage.clear();
			console.log("AsyncStorage cleared in development mode");
		} catch (error) {
			console.error("Failed to clear AsyncStorage", error);
		}
	}
};
export const getCategoriesData = async (dispatch: Dispatch) => {
	const categoriesData = await fetchCategories();
	dispatch(setCategories(categoriesData));
};
