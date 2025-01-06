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

	// Check onboarding status from AsyncStorage
	useEffect(() => {
		const checkOnboardingStatus = async () => {
			const onboarded = await AsyncStorage.getItem("hasOnboarded");
			if (onboarded === "true") {
				dispatch(setOnboarding(true));
			} else {
				dispatch(setOnboarding(false));
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
		}
	}, [isLoggedIn, hasOnboarded, router]);

