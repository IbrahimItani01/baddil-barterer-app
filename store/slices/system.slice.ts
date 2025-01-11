import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance, ColorSchemeName } from "react-native"; // ColorSchemeName is the correct type

interface System {
	colorScheme: ColorSchemeName;
	language: "en" | "fr";
	notifications: boolean;
}

const initialState: System = {
	colorScheme: Appearance.getColorScheme(),
	language: "en",
	notifications: true,
};

const systemSlice = createSlice({
	name: "system",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ColorSchemeName>) => {
			state.colorScheme = action.payload;
		},
		setLanguage: (state, action: PayloadAction<"en" | "fr">) => {
			state.language = action.payload;
		},
		toggleNotifications: (state) => {
			state.notifications = !state.notifications;
		},
	},
});

export const { setTheme, setLanguage, toggleNotifications } =
	systemSlice.actions;
export default systemSlice.reducer;
