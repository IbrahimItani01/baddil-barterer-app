import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "@/store/slices/user.slice";
import { router } from "expo-router";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const DoneButton = () => {
	const dispatch = useDispatch();

	const handlePress = () => {
		dispatch(completeOnboarding());
		router.replace("/auth");
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<Text style={styles.buttonText}>Let's Go!</Text>
		</TouchableOpacity>
	);
};

export default DoneButton;

const styles = StyleSheet.create({
	buttonText: {
		fontFamily: `${fontFamily.NunitoSans.Bold}`,
		color: colors.primary,
		marginRight: 20,
		marginVertical: 10,
		fontSize: 16,
	},
});
