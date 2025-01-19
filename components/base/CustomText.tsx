import { colors } from "@/lib/constants/colors.constant";
import { CustomTextInterface } from "@/lib/interfaces/CustomText.interface";
import React from "react";
import { Text } from "react-native";
import "../../global.css";
import { useAppSelector } from "@/store/hooks";

const CustomText = (prop: CustomTextInterface) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	
	return (
		<Text
			style={[
				{
					color:
						theme === "dark"
							? `${colors["white-font"]}`
							: `${colors["black-font"]}`,
				},
				prop.style,
			]}
			className={prop.NativeClasses}
		>
			{prop.content}
		</Text>
	);
};

export default CustomText;
