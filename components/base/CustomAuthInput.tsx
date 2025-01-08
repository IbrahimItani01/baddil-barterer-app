import React from "react";
import { Input } from "@rneui/themed";
import { AuthInputInterface } from "@/lib/interfaces/auth/auth.interface";
import {
	Alert,
	Text,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { useAppSelector } from "@/store/hooks";
import { sendForgetPasswordEmail } from "@/apis/routes/auth/auth.routes";
import { useDispatch } from "react-redux";
import { withLoader } from "@/lib/utils/async.utils";

const CustomAuthInput = ({
	forRegister = false,
	...props
}: AuthInputInterface) => {
	const { email } = useAppSelector((state) => state.auth);
	const theme = useColorScheme();
	const dispatch = useDispatch();
	const handleForgotPassword = async () => {
		if (email) {
			await withLoader(dispatch, () => sendForgetPasswordEmail(email));
		} else {
			Alert.alert("Please enter your email address.");
		}
	};

	return (
		<View
			className={props.NativeClasses}
			style={{
				marginTop: 10,
			}}
		>
			<Input
				value={props.value}
				onChangeText={props.onChangeText}
				placeholder={props.placeholder}
				secureTextEntry={props.isPassword}
				autoComplete={props.type}
				label={props.label}
				style={{
					marginLeft: 5,
					position: "relative",
					color: theme === "light" ? "#000" : "#fff",
				}}
				labelStyle={{
					color: theme === "light" ? "#000" : "#fff",
					fontFamily: "NunitoSans-SemiBold",
				}}
				renderErrorMessage={false}
			/>

			{props.isPassword && !forRegister && (
				<View
					style={{
						position: "absolute",
						top: "110%",
						right: 10,
					}}
				>
					<TouchableOpacity onPress={handleForgotPassword}>
						<Text
							style={{
								textDecorationLine: "underline",
							}}
							className='text-primary font-nunito-semibold font-semibold'
						>
							Forgot Password?
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default CustomAuthInput;
