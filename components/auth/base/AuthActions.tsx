import { View, TouchableOpacity } from "react-native";
import React from "react";
import CustomView from "@/components/base/CustomView";
import Button from "@/components/base/Button";
import { Divider } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";

interface AuthActions {
	onSubmit: () => void;
	handleGoogleAuth: () => void;
	buttonContent: string;
	type: "login" | "register";
}

const AuthActions = (props: AuthActions) => {
	const { email, password, username, confirmPassword } = useAppSelector(
		(state) => state.auth
	);

	return (
		<CustomView
			style={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Button
				title={props.buttonContent}
				onPress={props.onSubmit}
				disabled={
					props.type === "login"
						? !email || !password
						: !email || !password || !username || !confirmPassword
				}
			/>
			<Divider
				style={{
					marginVertical: 20,
					marginHorizontal: 50,
				}}
				insetType='left'
				width={1}
			/>
			<TouchableOpacity onPress={props.handleGoogleAuth}>
				<View
					style={{
						borderColor: `${colors.primary}`,
						borderWidth: 2,
						padding: 10,
						borderRadius: 50,
						alignSelf: "center",
					}}
				>
					<FontAwesome5
						name='google'
						size={30}
						color={colors.primary}
					/>
				</View>
			</TouchableOpacity>
		</CustomView>
	);
};

export default AuthActions;
