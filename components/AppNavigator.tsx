import { RootState } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	login,
	logout,
	setOnboarding,
	setProfilePictureUrl,
} from "@/store/slices/user.slice";
import { serveUserProfileImage } from "@/apis/routes/user/user.routes";

const AppNavigator = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isLoggedIn, hasOnboarded } = useSelector(
		(state: RootState) => state.user
	);

	const fetchProfilePicture = async () => {
		const profilePictureUrl = await serveUserProfileImage();
		if (profilePictureUrl) {
			dispatch(setProfilePictureUrl(profilePictureUrl));
		} else {
			dispatch(setProfilePictureUrl(""));
		}
	};

	const checkOnboardingStatus = async () => {
		const onboarded = await AsyncStorage.getItem("hasOnboarded");
		if (onboarded === "true") {
			dispatch(setOnboarding(true));
		} else {
			dispatch(setOnboarding(false));
		}
	};
	const checkLoginStatus = async () => {
		const token = await AsyncStorage.getItem("jwtToken");
		if (token) {
			dispatch(login());
		} else {
			dispatch(logout());
		}
	};

	// Check onboarding status from AsyncStorage
	useEffect(() => {
		checkOnboardingStatus();
		checkLoginStatus();
		fetchProfilePicture();
	}, [dispatch]);

	// Handle navigation based on login and onboarding status
	useEffect(() => {
		if (!isLoggedIn && !hasOnboarded) router.replace("/onBoarding");
		else if (!isLoggedIn && hasOnboarded) router.replace("/auth");
		else router.replace("/(tabs)");
	}, [isLoggedIn, hasOnboarded, router]);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='(tabs)' />
			<Stack.Screen name='onBoarding/index' />
			<Stack.Screen name='auth/index' />
			<Stack.Screen name='+not-found' />
		</Stack>
	);
};

export default AppNavigator;
