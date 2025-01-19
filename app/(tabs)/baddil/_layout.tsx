import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen name='(subPages)/Subcategories' />
			<Stack.Screen name='(details)/DetailsPage' />
		</Stack>
	);
};

export default Layout;
