import { View, useColorScheme } from "react-native";
import React from "react";
import { CustomViewInterface } from "@/lib/interfaces/CustomView.interface";
import { colors } from "@/lib/constants/colors.constant";
import "../../global.css";
const CustomView = (prop: CustomViewInterface) => {
	const theme = useColorScheme();
	return (
		<View
			className={prop.NativeClasses}
			style={{
				backgroundColor:
					theme === "dark" ? `${colors["dark-bg"]}` : `${colors["light-bg"]}`,
				height: prop.mainScreen ? "100%" : "auto",
			}}
		>
			{prop.children}
		</View>
	);
};

export default CustomView;
