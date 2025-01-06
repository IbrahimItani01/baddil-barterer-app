import { Stack } from "expo-router/stack";
import { StatusBar, useColorScheme } from "react-native";

export default function Layout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<StatusBar
				barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
			/>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name='(tabs)' />
				<Stack.Screen name='onBoarding' />
				<Stack.Screen name='+not-found' />
			</Stack>
		</>
	);
}
