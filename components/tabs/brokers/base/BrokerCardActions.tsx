import { Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomView from "@/components/base/CustomView";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
interface BrokerCardActionsInterface {
	hired: boolean;
}
const BrokerCardActions = ({ hired }: BrokerCardActionsInterface) => {
	const handleCardAction = () => {
		hired //handle chat
			? console.log("chat open")
			: //handle hire
			  console.log("request sent to broker");
	};
	return (
		<CustomView
			style={{
				position: "absolute",
				right: 10,
				bottom: 10,
			}}
		>
			<TouchableOpacity onPress={handleCardAction}>
				<Text
					style={{
						textDecorationLine: "underline",
						color: colors.primary,
						fontSize: 12,
						fontFamily: fontFamily.NunitoSans.Medium,
					}}
				>
					{hired ? "Chat" : "Hire"}
				</Text>
			</TouchableOpacity>
		</CustomView>
	);
};

export default BrokerCardActions;
