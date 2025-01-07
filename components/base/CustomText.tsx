import { colors } from "@/lib/constants/colors.constant";
import { CustomTextInterface } from "@/lib/interfaces/CustomText.interface";
import React from "react";
import { Text, useColorScheme } from "react-native";
import "../../global.css";
const CustomText = (prop: CustomTextInterface) => {
	const theme = useColorScheme();
	return (
		<Text
			style={{
				color:
					theme === "dark"
						? `${colors["white-font"]}`
						: `${colors["black-font"]}`,
			}}
			className={prop.NativeClasses}
		>
			{prop.content}
		</Text>
	);
};

export default CustomText;
