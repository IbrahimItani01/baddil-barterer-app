import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { setUserName } from "@/store/slices/user.slice";
import CustomAlert from "./base/CustomAlert";
import { withLoader } from "@/lib/utils/async.utils";
import { sendForgetPasswordEmail } from "@/apis/routes/auth/auth.routes";
import { updateUserInfo } from "@/apis/routes/user/user.routes";

const iconMap: {
	[key in
		| "Profile Picture"
		| "Username"
		| "Password"
		| "Account"]: keyof typeof MaterialIcons.glyphMap;
} = {
	"Profile Picture": "photo",
	Username: "account-circle",
	Password: "lock",
	Account: "person",
};
const ProfileSection = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const { email } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const [alertVisible, setAlertVisible] = useState(false);
	const [alertFor, setAlertFor] = useState<
		"username" | "password" | "profilePicture"
	>("username");

	const handleOpenAlert = (
		type: "username" | "password" | "profilePicture"
	) => {
		setAlertFor(type);
		setAlertVisible(true);
	};

	const handleConfirm = (value: string) => {
		if (alertFor === "username" && value.trim()) {
			dispatch(setUserName(value));
			withLoader(dispatch, () => updateUserInfo({ name: value }));
		} else if (alertFor === "password") {
			withLoader(dispatch, () => sendForgetPasswordEmail(email));
		} else if (alertFor === "profilePicture") {
		}
		setAlertVisible(false);
	};
	const handleAccountDelete = () => {};

	return (
		<>
			<CustomAlert
				alertFor={alertFor}
				visible={alertVisible}
				onCancel={() => setAlertVisible(false)}
				onConfirm={handleConfirm}
			/>
			<CustomView
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 10,
				}}
			>
				{["Profile Picture", "Username", "Password", "Account"].map(
					(text, index) => (
						<CustomView
							key={index}
							style={[
								styles.accountDetailItem,
								{
									borderColor:
										theme === "dark"
											? colors["dark-gray-dark-theme"]
											: colors["light-gray-light-theme"],
								},
							]}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									gap: 5,
								}}
							>
								<MaterialIcons
									name={iconMap[text as keyof typeof iconMap]}
									size={24}
									color={
										theme === "dark" ? colors["light-bg"] : colors["dark-bg"]
									}
								/>

								<CustomText
									style={{
										fontFamily: fontFamily.NunitoSans.Bold,
									}}
									content={text}
								/>
							</View>

							{/* Icon before "Change" */}
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									gap: 5,
									alignItems: "center",
								}}
							>
								{text === "Account" ? (
									<TouchableOpacity
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											gap: 3,
										}}
										onPress={handleAccountDelete}
									>
										<CustomText
											content='Delete'
											style={[
												styles.deleteText,
												{
													textDecorationLine: "underline",
													color: colors["primary"],
												},
											]}
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										style={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											gap: 3,
										}}
										onPress={() =>
											text === "Username"
												? handleOpenAlert("username")
												: text === "Password"
												? handleOpenAlert("password")
												: handleOpenAlert("profilePicture")
										}
									>
										<CustomText
											content='Change'
											style={styles.changeText}
										/>
									</TouchableOpacity>
								)}
							</View>
						</CustomView>
					)
				)}
			</CustomView>
		</>
	);
};

export default ProfileSection;

const styles = StyleSheet.create({
	accountDetailItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		borderWidth: 1,
		borderRadius: 8,
	},
	changeText: {
		textDecorationLine: "underline",
		color: colors.primary,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	deleteText: {
		fontFamily: fontFamily.NunitoSans.Bold,
	},
});
