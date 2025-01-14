import { View, Text, ViewStyle } from "react-native";
import React from "react";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CustomView from "@/components/base/CustomView";
import { SafeAreaView } from "react-native-safe-area-context";

interface GenericScreenProps {
	title: string;
	children: React.ReactNode;
	style?: ViewStyle;
}
const TabScreen: React.FC<GenericScreenProps> = ({
	title,
	children,
	style,
}) => {
	return (
		<CustomView mainScreen={true}>
			<SafeAreaView
				style={{
					paddingHorizontal: 15,
					paddingTop: 15,
					display: "flex",
					flexDirection: "column",
					gap: 20,
					...style, // Allow custom styles
				}}
			>
				<CustomText
					style={{
						fontFamily: fontFamily.Raleway.Bold,
						fontSize: 40,
					}}
					content={title}
				/>
				{children}
			</SafeAreaView>
		</CustomView>
	);
};

export default TabScreen;
