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

