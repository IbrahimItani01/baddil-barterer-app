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
};
