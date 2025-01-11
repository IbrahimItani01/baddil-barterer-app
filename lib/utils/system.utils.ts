import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
import {
	login,
	logout,
	setOnboarding,
	setProfilePictureUrl,
	setStatus,
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
import { useEffect } from "react";

export const initializeApp = async (dispatch: Dispatch) => {
	await checkOnboardingStatus(dispatch);
	await checkLoginStatus(dispatch);
	await fetchProfilePicture(dispatch);
	await fetchUserData(dispatch);
	await getUserTier(dispatch);
};

export const handleStatusNavigation = async (
	isLoggedIn: boolean,
	hasOnboarded: boolean,
	status: UserStatusEnum,
	router: Router,
	dispatch: Dispatch
) => {
	if (status === UserStatusEnum.Active) {
		handleNavigation(isLoggedIn, hasOnboarded, router);
	} else if (status === UserStatusEnum.Flagged) {
		await showAlert(
			"Warning, Flagged User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		handleNavigation(isLoggedIn, hasOnboarded, router);
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

export const handleNavigation = (
	isLoggedIn: boolean,
	hasOnboarded: boolean,
	router: Router
) => {
	if (!isLoggedIn && !hasOnboarded) {
		router.replace("/onBoarding");
	} else if (!isLoggedIn && hasOnboarded) {
		router.replace("/auth");
	} else {
		router.replace("/(tabs)");
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
	dispatch(setStatus(userData.status));
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
