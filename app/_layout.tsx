import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import "../global.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import AppNavigator from "@/components/AppNavigator";
import Loader from "@/components/base/Loader";
import ScreenLoader from "@/components/base/ScreenLoader";
import { clearStorageOnDev } from "@/lib/utils/system.utils";

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
