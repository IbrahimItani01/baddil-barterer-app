import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import CustomText from "@/components/base/CustomText";

const WelcomeBar = () => {
	const { userName } = useAppSelector((state) => state.user);

	return (
		<View>
			<CustomText content={`Welcome Back , ${userName}!`} />
			{/* TODO: serve the profile picture of the user */}
		</View>
	);
};

export default WelcomeBar;
