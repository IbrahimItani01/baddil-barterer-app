import { RootState } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setOnboarding } from "@/store/slices/user.slice";

const AppNavigator = () => {
	const router = useRouter();
	const { isLoggedIn, hasOnboarded } = useSelector(
		(state: RootState) => state.user
	);
	const dispatch = useDispatch();
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
		checkOnboardingStatus();
	}, [dispatch]);

	// Handle navigation based on login and onboarding status
	useEffect(() => {
		if (!isLoggedIn) {
			if (!hasOnboarded) {
				router.replace("/onBoarding");
			} else {
				router.replace("/auth");
			}
		} else {
			router.replace("/(tabs)");
		}
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
