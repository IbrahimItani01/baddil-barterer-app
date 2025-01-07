import { StyleProp, TextStyle } from "react-native";

export interface CustomTextInterface {
	content: string;
	NativeClasses?: string;
	style?: StyleProp<TextStyle>;
}
