import { useColorScheme, View } from "react-native";
import React from "react";
import CustomText from "@/components/base/CustomText";
import { useAppSelector } from "@/store/hooks";
import CustomView from "@/components/base/CustomView";
import * as Progress from "react-native-progress";
import { colors } from "@/lib/constants/colors.constant";

const TierProgressBar = () => {
	const { progress, currentTier } = useAppSelector((state) => state.tiers);
	const theme = useColorScheme();
	return (
		<View>
			<Text>TierProgressBar</Text>
		</View>
	);
};

export default TierProgressBar;
