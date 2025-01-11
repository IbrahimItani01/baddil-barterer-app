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

export const handleNavigation = async (
	isLoggedIn: boolean,
	hasOnboarded: boolean,
	booting: boolean,
	router: Router
) => {
	// UseEffect to handle navigation after the component is mounted
	useEffect(() => {
		const checkStorageAndNavigate = async () => {
			try {
				// Retrieve values from AsyncStorage
				const onboardedFromStorage = await AsyncStorage.getItem("hasOnboarded");
				const token = await AsyncStorage.getItem("jwtToken");
				const hasOnboardedFromStorage = onboardedFromStorage === "true";

				if (
					!isLoggedIn &&
					!hasOnboarded &&
					!token &&
					!hasOnboardedFromStorage
				) {
					router.replace("/onBoarding");
				} else if (
					(!isLoggedIn && hasOnboarded) ||
					(!token && hasOnboardedFromStorage)
				) {
					router.replace("/auth");
				} else {
					router.replace("/(tabs)");
				}
			} catch (error) {
				console.error("Error checking AsyncStorage:", error);
				router.replace("/auth");
			}
		};

		checkStorageAndNavigate();
	}, [isLoggedIn, hasOnboarded, booting, router]);
};

export const handleStatusNavigation = async (
	isLoggedIn: boolean,
	hasOnboarded: boolean,
	status: UserStatusEnum,
	booting: boolean,
	router: Router,
	dispatch: Dispatch
) => {
	if (status === UserStatusEnum.Active) {
		handleNavigation(isLoggedIn, hasOnboarded, booting, router);
	} else if (status === UserStatusEnum.Flagged) {
		await showAlert(
			"Warning, Flagged User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		handleNavigation(isLoggedIn, hasOnboarded, booting, router);
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
