import { View, ViewStyle, TouchableOpacity, Alert } from "react-native";
import React from "react";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CustomView from "@/components/base/CustomView";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/user.slice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GenericScreenProps {
	title: string;
	children: React.ReactNode;
	style?: ViewStyle;
	isProfile?: boolean;
}
const TabScreen: React.FC<GenericScreenProps> = ({
	title,
	children,
	style,
	isProfile = false,
}) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const handleLogout = () => {
		Alert.alert(
			"Logout Confirmation",
			"Are you sure you want to log out?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: async () => {
						dispatch(logout());
						await AsyncStorage.removeItem("jwtToken");
						router.replace("/auth");
					},
				},
			],
			{ cancelable: true }
		);
	};
	return (
		<CustomView mainScreen={true}>
			<SafeAreaView
				style={{
					paddingHorizontal: 15,
					paddingTop: 15,
					display: "flex",
					flexDirection: "column",
					gap: 20,
					...style,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<CustomText
						style={{
							fontFamily: fontFamily.Raleway.Bold,
							fontSize: 40,
						}}
						content={title}
					/>
					{isProfile && (
						<TouchableOpacity onPress={handleLogout}>
							<MaterialIcons
								name='logout'
								color={colors.primary}
								size={30}
							/>
						</TouchableOpacity>
					)}
				</View>
				{children}
			</SafeAreaView>
		</CustomView>
	);
};

export default TabScreen;
