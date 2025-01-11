import {
	View,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	StyleSheet,
} from "react-native";
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
	containerStyle: StyleProp<ViewStyle>;
	dividerStyle: StyleProp<ViewStyle>;
}

const AuthActions = (props: AuthActions) => {
	const { email, password, username, confirmPassword } = useAppSelector(
		(state) => state.auth
	);

	return (
		<CustomView style={props.containerStyle}>
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
				style={props.dividerStyle}
				width={1}
			/>
			<TouchableOpacity onPress={props.handleGoogleAuth}>
				<View style={styles.googleButton}>
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

const styles = StyleSheet.create({
	googleButton: {
		borderColor: colors.primary,
		borderWidth: 2,
		padding: 10,
		borderRadius: 50,
		alignSelf: "center",
	},
});

export default AuthActions;
