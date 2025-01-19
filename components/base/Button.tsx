import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonInterface } from "@/lib/interfaces/Button.interface";
import "../../global.css";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const Button = (prop: ButtonInterface) => {
	return (
		<TouchableOpacity
			onPress={prop.onPress}
			style={[
				styles.button,
				prop.disabled && styles.disabledButton,
				prop.type === "outline" ? styles.outlineButton : styles.primaryButton,
				prop.style,
			]}
			disabled={prop.disabled}
		>
			<View style={styles.buttonContent}>
				{prop.disabled ? (
					<MaterialIcons
						name='lock'
						size={20}
						color={prop.type === "outline" ? "gray" : "white"}
					/>
				) : (
					<Text
						style={[
							styles.buttonText,
							prop.type === "outline" ? styles.outlineText : styles.primaryText,
							prop.textStyle,
						]}
					>
						{prop.title}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};
export default Button;

const styles = StyleSheet.create({
	button: {
		paddingVertical: 20,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius:50
	},
	disabledButton: {
		opacity: 0.5,
	},
	outlineButton: {
		borderWidth: 2,
		borderColor: `${colors.primary}`,
		backgroundColor: 'transparent'
	},
	primaryButton: {
		backgroundColor: `${colors.primary}`,
	},
	buttonContent: {
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		textAlign: "center",
		textTransform: "uppercase",
		fontFamily: `${fontFamily.NunitoSans.SemiBold}`,
		fontSize:16
	},
	outlineText: {
		color: `${colors.primary}`,
	},
	primaryText: {
		color: "white",
	},
});

