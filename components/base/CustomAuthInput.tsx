import React from "react";
import { Input } from "@rneui/themed";
import { AuthInputInterface } from "@/lib/interfaces/auth/auth.interface";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const CustomAuthInput = (props: AuthInputInterface) => {
	const theme = useColorScheme();
	const handleForgotPassword = () => {
		// handle forgot password
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

			{props.isPassword && (
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
