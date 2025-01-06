/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#E60000",
				"light-bg": "#FFFFFF",
				"dark-bg": "#140000",
				"black-font": "#000000",
				"white-font": "#FFFFFF",
			},
			fontFamily: {
				raleway: [
					"Raleway-Light",
					"Raleway-Regular",
					"Raleway-Medium",
					"Raleway-SemiBold",
					"Raleway-Bold",
					"Raleway-ExtraBold",
				],
				nunito: [
					"NunitoSans-Regular",
					"NunitoSans-Medium",
					"NunitoSans-SemiBold",
					"NunitoSans-Bold",
					"NunitoSans-ExtraBold",
				],
			},
			fontWeight: {
				light: "300",
				regular: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
