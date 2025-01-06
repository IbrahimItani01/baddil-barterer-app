import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";
import AppNavigator from "@/components/AppNavigator";

export default function Layout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<StatusBar
				barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
			/>
			<AppNavigator />
	);
}
