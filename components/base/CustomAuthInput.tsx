import React from "react";
import { Input } from "@rneui/themed";
import { AuthInputInterface } from "@/lib/interfaces/auth/auth.interface";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { sendForgetPasswordEmail } from "@/apis/routes/auth/auth.routes";
import { useDispatch } from "react-redux";
import { withLoader } from "@/lib/utils/async.utils";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const CustomAuthInput = ({
	forRegister = false,
	...props
}: AuthInputInterface) => {
	
	const { email } = useAppSelector((state) => state.auth);
	const theme = useAppSelector((state) => state.system.colorScheme);
	const dispatch = useDispatch();

	const handleForgotPassword = async () => {
		if (email) {
			await withLoader(dispatch, () => sendForgetPasswordEmail(email));
		} else {
			Alert.alert("Please enter your email address.");
		}
	};

	return (
		<View style={[styles.container]}>
			<Input
				value={props.value}
				onChangeText={props.onChangeText}
				placeholder={props.placeholder}
				secureTextEntry={props.isPassword}
				autoComplete={props.type}
				label={props.label}
				style={[styles.input, { color: theme === "light" ? "#000" : "#fff" }]}
				labelStyle={styles.label}
				renderErrorMessage={false}
			/>

			{props.isPassword && !forRegister && (
				<View style={styles.forgotPasswordContainer}>
					<TouchableOpacity onPress={handleForgotPassword}>
						<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default CustomAuthInput;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
	},
	input: {
		marginLeft: 5,
		position: "relative",
	},
	label: {
		fontFamily: `${fontFamily.NunitoSans.SemiBold}`,
	},
	forgotPasswordContainer: {
		position: "absolute",
		top: "110%",
		right: 10,
	},
	forgotPasswordText: {
		textDecorationLine: "underline",
		color: `${colors.primary}`, // Adjust the color as needed
		fontFamily: `${fontFamily.NunitoSans.SemiBold}`,
		fontWeight: "600",
	},
});
