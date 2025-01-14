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
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	startBooting,
	stoppedBooting,
} from "@/store/slices/screenLoader.slice";

const AppNavigator = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { booting } = useAppSelector((state) => state.screenLoader);
	const { isLoggedIn, hasOnboarded, status } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		const initAndNavigate = async () => {
			const token = await AsyncStorage.getItem("jwtToken");
			const onboarded = await AsyncStorage.getItem("onboarded");
			if (token) {
				dispatch(startBooting());
				await initializeApp(dispatch).finally(() => dispatch(stoppedBooting()));
			}
			handleStatusNavigation(status, router, token, onboarded, dispatch);
		};

		initAndNavigate();
	}, [isLoggedIn, hasOnboarded]);

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
