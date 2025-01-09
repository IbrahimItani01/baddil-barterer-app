import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import AppNavigator from "@/components/AppNavigator";
import Loader from "@/components/base/Loader";
import ScreenLoader from "@/components/base/ScreenLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const clearStorageOnDev = async () => {
	if (__DEV__) {
		try {
			await AsyncStorage.clear();
			console.log("AsyncStorage cleared in development mode");
		} catch (error) {
			console.error("Failed to clear AsyncStorage", error);
		}
	}
};

export default function Layout() {
	const colorScheme = useColorScheme();
	// useEffect(() => {
	// 	clearStorageOnDev();
	// }, []);
	return (
		<Provider store={store}>
			<StatusBar
				barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
			/>
			<ScreenLoader />
			<Loader>
				<AppNavigator />
			</Loader>
		</Provider>
	);
}
