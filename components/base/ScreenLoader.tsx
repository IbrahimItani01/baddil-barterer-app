import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const ScreenLoader: React.FC = () => {
	const isLoading = useAppSelector((state) => state.screenLoader.loading);

	if (!isLoading) return null;
	return (
		<View style={styles.container}>
			<ActivityIndicator
				size='large'
				color={`${colors.primary}`}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
	},
	message: {
		marginTop: 10,
		fontSize: 16,
		color: "white",
	},
});

export default ScreenLoader;
