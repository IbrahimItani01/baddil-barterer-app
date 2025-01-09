import { RootState } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	checkLoginStatus,
	checkOnboardingStatus,
	fetchProfilePicture,
	fetchUserData,
	handleStatusNavigation,
} from "@/lib/utils/system.utils";

const AppNavigator = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const navigationHandled = useRef(false); // Use ref to prevent repeated navigation

	const { isLoggedIn, hasOnboarded, status } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		checkOnboardingStatus(dispatch);
		checkLoginStatus(dispatch);
		fetchProfilePicture(dispatch);
		fetchUserData(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (!navigationHandled.current) {
			navigationHandled.current = true;
			handleStatusNavigation(
				isLoggedIn,
				hasOnboarded,
				status,
				router,
				dispatch
			).finally(() => (navigationHandled.current = false));
		}
	}, [isLoggedIn, hasOnboarded, status, router, dispatch]);

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
