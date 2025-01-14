import { RootState } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	handleStatusNavigation,
	initializeApp,
} from "@/lib/utils/system.utils";
import { useAppSelector } from "@/store/hooks";
import ScreenLoader from "./base/ScreenLoader";
import { setTheme } from "@/store/slices/system.slice";
import { Appearance, ColorSchemeName } from "react-native";

const AppNavigator = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const navigationHandled = useRef(false); // Use ref to prevent repeated navigation
	const { booting } = useAppSelector((state) => state.screenLoader);
	const { isLoggedIn, hasOnboarded, status } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		const initAndNavigate = async () => {
			if (isLoggedIn) {
				await initializeApp(dispatch);
			}
			handleStatusNavigation(
				isLoggedIn,
				hasOnboarded,
				status,
				booting,
				router,
				dispatch
			);
		};

		initAndNavigate();
	}, [isLoggedIn, hasOnboarded, status, router, booting, dispatch]);

	useEffect(() => {
		if (!navigationHandled.current) {
			navigationHandled.current = true;
			handleStatusNavigation(
				isLoggedIn,
				hasOnboarded,
				status,
				booting,
				router,
				dispatch
			).finally(() => {
				navigationHandled.current = false;
			});
		}
	}, [isLoggedIn, hasOnboarded, status, router, booting, dispatch]);

	useEffect(() => {
		dispatch(setTheme(Appearance.getColorScheme()));

		const listener = Appearance.addChangeListener(
			({ colorScheme }: { colorScheme: ColorSchemeName }) => {
				dispatch(setTheme(colorScheme)); // Corrected typo here
			}
		);

		return () => listener.remove();
	}, [dispatch]);

	return booting ? (
		<ScreenLoader />
	) : (
		<>
			<ScreenLoader />
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name='(tabs)' />
				<Stack.Screen name='onBoarding/index' />
				<Stack.Screen name='auth/index' />
				<Stack.Screen name='+not-found' />
				<Stack.Screen name='qr/index' />

			</Stack>
		</>
	);
};

export default AppNavigator;
