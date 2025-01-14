import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";

const ChatsFilter = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [condition, setCondition] = useState("");

	const handlePress = (option: string) => {
		if (condition === option) {
			setCondition(""); // Reset to "All" by default if the same option is pressed
		} else {
			setCondition(option);
		}
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.conditionContainer}
		>
			{["All", "Unread", "Barterers", "Brokers", "Auto Baddil"].map(
				(option) => (
					<TouchableOpacity
						key={option}
						onPress={() => handlePress(option)}
						style={[
							styles.conditionButton,
							((condition === "" && option === "All") ||
								condition === option) &&
								styles.selectedCondition,
							{
								borderColor:
									theme === "dark"
										? colors["dark-gray-dark-theme"]
										: colors["light-gray-light-theme"],
							},
						]}
					>
						<CustomText
							style={[
								(condition === "" && option === "All") || condition === option
									? styles.selectedConditionText
									: styles.conditionText,
							]}
							content={option}
						/>
					</TouchableOpacity>
				)
			)}
		</ScrollView>
	);
};

export default ChatsFilter;

const styles = StyleSheet.create({
	conditionContainer: {
		flexDirection: "row",
		gap: 5,
		marginBottom: 16,
		paddingHorizontal: 4, // Optional padding for better spacing
	},
	conditionButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 50,
		borderWidth: 1,
	},
	selectedCondition: {
		backgroundColor: colors.primary,
	},
	conditionText: {},
	selectedConditionText: {
		color: colors["white-font"],
		fontFamily: fontFamily.NunitoSans.Regular,
	},
});
