import { View, useColorScheme } from "react-native";
import React from "react";
import { CustomViewInterface } from "@/lib/interfaces/CustomView.interface";
import { colors } from "@/lib/constants/colors.constant";
import "../../global.css";
import { useAppSelector } from "@/store/hooks";

const CustomView = (prop: CustomViewInterface) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	return (
		<View
			className={prop.NativeClasses}
			style={[
				{
					backgroundColor:
						theme === "dark" ? `${colors["dark-bg"]}` : `${colors["light-bg"]}`,
					height: prop.mainScreen ? "100%" : "auto",
				},
				prop.style,
			]}
		>
			{prop.children}
		</View>
	);
};

export default CustomView;
