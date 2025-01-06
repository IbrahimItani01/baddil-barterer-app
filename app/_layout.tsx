import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import AppNavigator from "@/components/AppNavigator";

export default function Layout() {
	const colorScheme = useColorScheme();

	return (
		<Provider store={store}>
			<StatusBar
				barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
			/>
			<AppNavigator />
		</Provider>
	);
}
