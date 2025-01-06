import { Stack } from "expo-router/stack";
import { StatusBar, useColorScheme } from "react-native";

export default function Layout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<StatusBar
				barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
			/>
