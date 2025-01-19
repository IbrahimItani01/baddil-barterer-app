import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "@/components/base/Loader";
import { useDispatch } from "react-redux";
import "../../global.css";
import { completeOnboarding } from "@/store/slices/user.slice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DoneButton from "@/components/onBoarding/DoneButton";
import { useAppSelector } from "@/store/hooks";
import { fontFamily } from "@/lib/constants/fonts.constant";

const titleStyles = {
	fontFamily: `${fontFamily.Raleway.Bold}`,
	fontSize: 32,
};

const subTitleStyles = {
	fontFamily: `${fontFamily.NunitoSans.SemiBold}`,
	fontSize: 15,
};

const OnboardingScreen = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const dispatch = useDispatch();

	const handleNav = async () => {
		try {
			await AsyncStorage.setItem("onboarded", "true");
			dispatch(completeOnboarding());
			router.replace("/auth");
		} catch (error) {}
	};

	const pages = [
		{
			backgroundColor:
				theme === "dark" ? colors["dark-bg"] : colors["light-bg"],
			title: "Pay with what you own!",
			subtitle:
				"Need to buy something? With Baddil, no need to have cash, just barter for what you want!",
			image: (
				<Image
					source={require("../../assets/images/onboarding/wallet.png")}
					style={{ width: 200, height: 200 }}
				/>
			),
		},
		{
			backgroundColor:
				theme === "dark" ? colors["dark-bg"] : colors["light-bg"],
			title: "With Baddĭl, You are safe!",
			subtitle:
				"All your interactions with users happen on app. Even on meetups, a QR code is needed to scan!",
			image: (
				<Image
					source={require("../../assets/images/onboarding/safe.png")}
					style={{ width: 170, height: 170 }}
				/>
			),
		},
		{
			backgroundColor:
				theme === "dark" ? colors["dark-bg"] : colors["light-bg"],
			title: "Overwhelmed? Hire a broker!",
			subtitle:
				"A trusted broker will simplify your journey and guide you every step of the way!",
			image: (
				<Image source={require("../../assets/images/onboarding/broker.png")} />
			),
		},
		{
			backgroundColor:
				theme === "dark" ? colors["dark-bg"] : colors["light-bg"],
			title: "Yalla Baddil!",
			subtitle: "Start your journey, you will buy with no money!",
			image: (
				<Image
					source={require("../../assets/images/onboarding/rocket.png")}
					style={{ width: 200, height: 200 }}
				/>
			),
		},
	];

	return (
		<Loader>
			{/* @ts-ignore */}

			<Onboarding
				titleStyles={titleStyles}
				subTitleStyles={subTitleStyles}
				bottomBarHighlight={false}
				onDone={handleNav}
				onSkip={handleNav}
				DoneButtonComponent={DoneButton}
				pages={pages}
			/>
		</Loader>
	);
};

export default OnboardingScreen;
