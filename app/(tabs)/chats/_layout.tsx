import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false, // Custom header visibility
				animation: "slide_from_right", // Transition animation
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen name='(chat)/ChatPage' />
		</Stack>
	);
};

export default Layout;
