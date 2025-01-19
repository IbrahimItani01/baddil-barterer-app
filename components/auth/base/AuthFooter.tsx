import {
	View,
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	StyleSheet,
} from "react-native";
import React from "react";
import Loader from "@/components/base/Loader";
import { colors } from "@/lib/constants/colors.constant";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm, setIsLogin } from "@/store/slices/auth.slice";
import { fontFamily } from "@/lib/constants/fonts.constant";

interface AuthFooterInterface {
	hyperLinkContent: string;
	hintContent: string;
	containerStyle: StyleProp<ViewStyle>;
}

const AuthFooter = (props: AuthFooterInterface) => {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector((state) => state.auth.isLogin);
	const theme = useAppSelector((state) => state.system.colorScheme);

	const changeForm = () => {
		dispatch(setIsLogin(!isLogin));
		dispatch(resetForm());
	};

	return (
		<View style={props.containerStyle}>
			<Loader>
				<Text
					style={[
						styles.hintText,
						{
							color:
								theme === "dark" ? colors["white-font"] : colors["black-font"],
						},
					]}
				>
					{props.hintContent}
				</Text>
				<TouchableOpacity onPress={changeForm}>
					<Text style={styles.hyperLinkText}>{props.hyperLinkContent}</Text>
				</TouchableOpacity>
			</Loader>
		</View>
	);
};

export default AuthFooter;

const styles = StyleSheet.create({
	hintText: {
		fontFamily: `${fontFamily.NunitoSans.Light}`,
	},
	hyperLinkText: {
		textDecorationLine: "underline",
		color: colors.primary,
		fontFamily: fontFamily.NunitoSans.Bold,
	},
});
