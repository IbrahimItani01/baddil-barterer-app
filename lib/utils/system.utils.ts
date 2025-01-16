import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
import {
	login,
	logout,
	setEmail,
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
import { replaceLocalhost } from "./general.utils";
import { currentIp } from "@/apis/main";
import { setLocations } from "@/store/slices/locations.slice";
import { getAllLocationsData } from "@/apis/routes/locations/locations.routes";

export const initializeApp = async (dispatch: Dispatch) => {
	await checkOnboardingStatus(dispatch);
	await checkLoginStatus(dispatch);
	await fetchProfilePicture(dispatch);
	await getUserTier(dispatch);
	await getCategoriesData(dispatch);
	await fetchUserData(dispatch);
	await getAllLocations(dispatch)
};

export const handleNavigation = async (router: Router) => {
	try {
		const token = await AsyncStorage.getItem("jwtToken");
		const onboarded = await AsyncStorage.getItem("onboarded");
		if (!token && !onboarded) {
			router.replace("/onBoarding");
		} else if (!token && onboarded) {
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
	dispatch: Dispatch
) => {
	if (status === UserStatusEnum.Active) {
		handleNavigation(router);
	} else if (status === UserStatusEnum.Flagged) {
		await showAlert(
			"Warning, Flagged User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		handleNavigation(router);
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
	const newUrl = replaceLocalhost(profilePictureUrl, currentIp);
	dispatch(setProfilePictureUrl(newUrl || ""));
};

export const fetchUserData = async (dispatch: Dispatch) => {
	const userData = await getUserInfo();
	dispatch(setUserName(userData.name));
	dispatch(setEmail(userData.email));
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
export const getAllLocations = async (dispatch: Dispatch)=>{
	const locationsData = await getAllLocationsData();
	dispatch(setLocations(locationsData));
}