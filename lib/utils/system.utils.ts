// Importing required modules and functions from external libraries and local utilities
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

// Initialize the app by calling necessary functions to check statuses and fetch data
export const initializeApp = async (dispatch: Dispatch) => {
	await checkOnboardingStatus(dispatch); // Check if the user has completed onboarding
	await checkLoginStatus(dispatch); // Check if the user is logged in
	await fetchProfilePicture(dispatch); // Fetch the user's profile picture
	await getUserTier(dispatch); // Fetch user tier (if relevant)
	await getCategoriesData(dispatch); // Fetch categories data
	await fetchUserData(dispatch); // Fetch user data (name and email)
	await getAllLocations(dispatch); // Fetch all location data
};

// Handle the navigation based on the login and onboarding status
export const handleNavigation = async (router: Router) => {
	try {
		const token = await AsyncStorage.getItem("jwtToken"); // Retrieve JWT token from AsyncStorage
		const onboarded = await AsyncStorage.getItem("onboarded"); // Retrieve onboarding status
		if (!token && !onboarded) {
			router.replace("/onBoarding"); // If not logged in and not onboarded, redirect to onboarding
		} else if (!token && onboarded) {
			router.replace("/auth"); // If not logged in but onboarded, redirect to login
		} else {
			router.replace("/(tabs)"); // If logged in, navigate to the main tabs
		}
	} catch (error) {
		router.replace("/auth"); // Default to login if any error occurs
	}
};

// Handle navigation based on the user's status (active, flagged, banned)
export const handleStatusNavigation = async (
	status: UserStatusEnum,
	router: Router,
	dispatch: Dispatch
) => {
	if (status === UserStatusEnum.Active) {
		handleNavigation(router); // If the user is active, proceed with normal navigation
	} else if (status === UserStatusEnum.Flagged) {
		await showAlert(
			"Warning, Flagged User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		handleNavigation(router); // Flagged user receives a warning and proceeds
	} else {
		await showAlert(
			"Can't Access Baddil, Banned User!",
			"Contact support@baddil.com to resolve the conflict"
		);
		dispatch(logout()); // Log out the banned user
		if (Platform.OS === "android") {
			BackHandler.exitApp(); // On Android, exit the app if banned
		} else {
			router.replace("/auth"); // On other platforms, redirect to login
		}
	}
};

// Check if the user has completed the onboarding process
export const checkOnboardingStatus = async (dispatch: Dispatch) => {
	const onboarded = await AsyncStorage.getItem("hasOnboarded"); // Retrieve onboarding status
	dispatch(setOnboarding(onboarded === "true")); // Set onboarding state in Redux store
};

// Check if the user is logged in by verifying the presence of the JWT token
export const checkLoginStatus = async (dispatch: Dispatch) => {
	const token = await AsyncStorage.getItem("jwtToken"); // Retrieve JWT token
	if (token) {
		dispatch(login()); // If token exists, log the user in
	} else {
		dispatch(logout()); // If no token, log the user out
	}
};

// Fetch the user's profile picture URL and update the state
export const fetchProfilePicture = async (dispatch: Dispatch) => {
	const profilePictureUrl = await serveUserProfileImage(); // Get profile picture URL from API
	const newUrl = replaceLocalhost(profilePictureUrl, currentIp); // Replace localhost IP with current IP if necessary
	dispatch(setProfilePictureUrl(newUrl || "")); // Update profile picture URL in Redux store
};

// Fetch user information (name, email) and update the Redux store
export const fetchUserData = async (dispatch: Dispatch) => {
	const userData = await getUserInfo(); // Get user information from API
	dispatch(setUserName(userData.name)); // Update user's name in Redux store
	dispatch(setEmail(userData.email)); // Update user's email in Redux store
};

// Clear AsyncStorage during development mode for testing purposes
export const clearStorageOnDev = async () => {
	if (__DEV__) {
		try {
			await AsyncStorage.clear(); // Clear all data in AsyncStorage
			console.log("AsyncStorage cleared in development mode");
		} catch (error) {
			console.error("Failed to clear AsyncStorage", error); // Log an error if the clearing fails
		}
	}
};

// Fetch categories data and update the Redux store
export const getCategoriesData = async (dispatch: Dispatch) => {
	const categoriesData = await fetchCategories(); // Fetch categories from API
	dispatch(setCategories(categoriesData)); // Store categories data in Redux
};

// Fetch all location data and update the Redux store
export const getAllLocations = async (dispatch: Dispatch) => {
	const locationsData = await getAllLocationsData(); // Fetch locations from API
	dispatch(setLocations(locationsData)); // Store locations data in Redux
};
