import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector, useAppDispatch } from "@/store/hooks"; // Import useAppDispatch
import { stoppedBooting } from "@/store/slices/screenLoader.slice";
import React, { useEffect, useRef } from "react";
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Animated,
	Image,
} from "react-native";
import DarkSplash from "../../assets/images/splash-dark.png";
import LightSplash from "../../assets/images/splash.png";

const ScreenLoader: React.FC = () => {
	const { booting, loading } = useAppSelector((state) => state.screenLoader);
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.system.colorScheme);
	const fadeAnim = useRef(new Animated.Value(0)).current;

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

	if (!loading && !booting) return null;
	if (loading && !booting) {
		return (
			<View style={styles.container}>
				<ActivityIndicator
					size='large'
					color={`${colors.primary}`}
				/>
			</View>
		);
	}
	return (
		<Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
			{theme === "light" ? (
				<Image
					style={styles.image}
					source={LightSplash}
				/>
			) : (
				<Image
					style={styles.image}
					source={DarkSplash}
				/>
			)}
		</Animated.View>
	);
};

export default ScreenLoader;

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
	image: {
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1000,
	},
});
