import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const ScreenLoader: React.FC = () => {
	useEffect(() => {
		if (booting) {
			// Fade-in and fade-out animation sequence
			Animated.sequence([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.delay(1000),
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
				}),
			]).start(() => {
				dispatch(stoppedBooting());
			});
		}
	}, [fadeAnim, booting, dispatch]);
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
