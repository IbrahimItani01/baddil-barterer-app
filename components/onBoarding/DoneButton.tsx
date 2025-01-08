import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "@/store/slices/user.slice";
import { router } from "expo-router";
import { colors } from "@/lib/constants/colors.constant";

const DoneButton = () => {
	const dispatch = useDispatch();

	return (
		<TouchableOpacity
			onPress={() => {
				dispatch(completeOnboarding());
				router.replace("/auth");
			}}
		>
			<Text
				style={{
					fontFamily: "NunitoSans-Bold",
					color: colors.primary,
					marginRight: 20,
					marginVertical: 10,
					fontSize: 16,
				}}
			>
				Let's Go!
			</Text>
		</TouchableOpacity>
	);
};

export default DoneButton;
