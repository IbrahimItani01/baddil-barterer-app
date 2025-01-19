import { StyleSheet, View } from "react-native";
import React from "react";
import { CustomViewInterface } from "@/lib/interfaces/CustomView.interface";
import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";

const CustomView = (prop: CustomViewInterface) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const themeStyle =
		theme === "dark" ? styles.darkBackground : styles.lightBackground;

	return (
		<View
			className={prop.NativeClasses}
			style={[themeStyle, prop.mainScreen && styles.mainScreen, prop.style]}
		>
			{prop.children}
		</View>
	);
};

export default CustomView;

const styles = StyleSheet.create({
	darkBackground: {
		backgroundColor: colors["dark-bg"],
	},
	lightBackground: {
		backgroundColor: colors["light-bg"],
	},
	mainScreen: {
		height: "100%",
	},
});
