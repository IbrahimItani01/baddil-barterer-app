import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "@/components/base/Loader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import "../../global.css";
import { completeOnboarding } from "@/store/slices/user.slice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = () => {
	const theme = useColorScheme();
	const dispatch = useDispatch();

	const DoneButton = () => (
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

	const handleNav = async () => {
		try {
			await AsyncStorage.setItem("hasOnboarded", "true");
			dispatch(completeOnboarding());
			router.replace("/auth");
		} catch (error) {
			console.error("Failed to save onboarding status:", error);
		}
	};

	return (
		<Loader>
			<Onboarding
				titleStyles={{
					fontFamily: "Raleway-Bold",
					fontSize: 32,
				}}
				subTitleStyles={{
					fontFamily: "NunitoSans-SemiBold",
					fontSize: 15,
				}}
				containerStyles={{
					borderTopColor: "#e60000",
				}}
				onDone={handleNav}
				onSkip={handleNav}
		</Loader>
	);
};

export default OnboardingScreen;
