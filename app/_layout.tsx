import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import AppNavigator from "@/components/AppNavigator";
import Loader from "@/components/base/Loader";

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
			<Loader>
				<AppNavigator />
			</Loader>
		</Provider>
	);
}
