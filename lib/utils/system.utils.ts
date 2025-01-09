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
