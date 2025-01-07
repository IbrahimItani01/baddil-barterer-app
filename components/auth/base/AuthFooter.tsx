import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import Loader from "@/components/base/Loader";
import { colors } from "@/lib/constants/colors.constant";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsLogin } from "@/store/slices/auth.slice";

interface AuthFooterInterface {
	hyperLinkContent: string;
	hintContent: string;
}
const AuthFooter = (props: AuthFooterInterface) => {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector((state) => state.auth.isLogin);
	const theme = useColorScheme();
	const changeForm = () => {
		dispatch(setIsLogin(!isLogin));
	};
	return (
		<View
			style={{
				marginHorizontal: "auto",
				flexDirection: "row",
				alignItems: "center",
				gap: 5,
				marginBottom:10
			}}
		>
			<Loader>
				<Text
					style={{
						color:
							theme === "dark"
								? `${colors["white-font"]}`
								: `${colors["black-font"]}`,
						fontFamily: "NunitoSans-Light",
					}}
				>
					{props.hintContent}
				</Text>
				<TouchableOpacity onPress={changeForm}>
					<Text
						style={{
							textDecorationLine: "underline",
						}}
						className='text-primary font-nunito-semibold font-semibold'
					>
						{props.hyperLinkContent}
					</Text>
				</TouchableOpacity>
			</Loader>
		</View>
	);
};

export default AuthFooter;
