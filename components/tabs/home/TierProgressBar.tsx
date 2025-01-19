import React from "react";
import CustomText from "@/components/base/CustomText";
import { useAppSelector } from "@/store/hooks";
import CustomView from "@/components/base/CustomView";
import * as Progress from "react-native-progress";
import { colors } from "@/lib/constants/colors.constant";
import { StyleSheet } from "react-native";

const TierProgressBar = () => {
	const { progress, currentTier } = useAppSelector((state) => state.tiers);
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<CustomView style={styles.container}>
			<CustomText
				content={`Tier: ${
					currentTier ? currentTier : "Start Bartering to fill your Tier Bar!"
				}`}
				style={styles.tierText}
			/>
			<Progress.Bar
				progress={currentTier ? progress / 100 : 0}
				width={null}
				height={12}
				useNativeDriver={true}
				color={colors.primary}
				borderColor={
					theme === "light"
						? colors["light-gray-light-theme"]
						: colors["dark-gray-dark-theme"]
				}
				borderRadius={20}
			/>
		</CustomView>
	);
};

export default TierProgressBar;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		gap: 5,
	},
	tierText: {
		fontSize: 16,
		fontFamily: "NunitoSans-SemiBold",
	},
});
