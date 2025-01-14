import React from "react";
import { ScrollView, Switch, StyleSheet, View } from "react-native";
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { toggleNotifications } from "@/store/slices/system.slice";

const SettingsSection = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const notifications = useAppSelector((state) => state.system.notifications);
	const dispatch = useAppDispatch();

	const handleToggle = () => {
		dispatch(toggleNotifications());
	};

	return (
		<>
			<CustomText
				style={styles.settingsTitle}
				content='Settings'
			/>
			<ScrollView
				horizontal
				contentContainerStyle={styles.scrollContainer}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.settingsContainer}>
					<CustomView
						style={[
							styles.settingsItem,
							{
								borderColor:
									theme === "dark"
										? colors["dark-gray-dark-theme"]
										: colors["light-gray-light-theme"],
							},
						]}
					>
						<CustomText
							style={{
								fontFamily: fontFamily.NunitoSans.Bold,
							}}
							content='Push Notifications'
						/>
						<Switch
							value={notifications}
							onValueChange={handleToggle}
							trackColor={{
								false:
									theme === "dark"
										? colors["dark-gray-dark-theme"]
										: colors["light-gray-light-theme"],
								true: colors.primary,
							}}
						/>
					</CustomView>

					<CustomView
						style={[
							styles.settingsItem,
							{
								borderColor:
									theme === "dark"
										? colors["dark-gray-dark-theme"]
										: colors["light-gray-light-theme"],
							},
						]}
					>
						<CustomText
							style={{
								fontFamily: fontFamily.NunitoSans.Bold,
							}}
							content='Language'
						/>
						<CustomText
							content='English (EN)'
							style={styles.changeText}
						/>
					</CustomView>
				</View>
			</ScrollView>
		</>
	);
};

export default SettingsSection;

const styles = StyleSheet.create({
	settingsTitle: {
		fontSize: 24,
		fontFamily: fontFamily.Raleway.Bold,
	},
	scrollContainer: {},
	settingsContainer: {
		flexDirection: "row", // Change to row for horizontal layout
		columnGap: 10, // Use columnGap for spacing between items
	},
	settingsItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: 320, // Fixed width to make items scrollable
		padding: 20,
		borderWidth: 1,
		borderRadius: 8,
	},
	changeText: {
		textDecorationLine: "underline",
		color: colors.primary,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
});
