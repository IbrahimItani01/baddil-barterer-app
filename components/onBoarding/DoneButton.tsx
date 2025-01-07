import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
			<MaterialIcons
				name='login'
				size={35}
				color={colors.primary}
				style={{ marginRight: 20, marginVertical: 10 }}
			/>
		</TouchableOpacity>
	);
};

export default DoneButton;
