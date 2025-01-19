import { useFonts } from "expo-font";

export const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		"Raleway-Light": require("../assets/fonts/fonts/Raleway/static/Raleway-Light.ttf"),
		"Raleway-Regular": require("../assets/fonts/fonts/Raleway/static/Raleway-Regular.ttf"),
		"Raleway-Medium": require("../assets/fonts/fonts/Raleway/static/Raleway-Medium.ttf"),
		"Raleway-SemiBold": require("../assets/fonts/fonts/Raleway/static/Raleway-SemiBold.ttf"),
		"Raleway-Bold": require("../assets/fonts/fonts/Raleway/static/Raleway-Bold.ttf"),
		"Raleway-ExtraBold": require("../assets/fonts/fonts/Raleway/static/Raleway-ExtraBold.ttf"),

		"NunitoSans-Light": require("../assets/fonts/fonts/Nunito_Sans/static/NunitoSans_7pt-Light.ttf"),
		"NunitoSans-Regular": require("../assets/fonts/fonts/Nunito_Sans/static/NunitoSans_7pt-Regular.ttf"),
		"NunitoSans-Medium": require("../assets/fonts/fonts/Nunito_Sans/static/NunitoSans_7pt-Medium.ttf"),
		"NunitoSans-SemiBold": require("../assets/fonts/fonts/Nunito_Sans/static/NunitoSans_7pt-SemiBold.ttf"),
		"NunitoSans-Bold": require("../assets/fonts/fonts/Nunito_Sans/static/NunitoSans_7pt-Bold.ttf"),
		"NunitoSans-ExtraBold": require("../assets/fonts/fonts/Nunito_Sans/static/NunitoSans_7pt-ExtraBold.ttf"),
	});

	return fontsLoaded;
};
