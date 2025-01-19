import { View, ScrollView } from "react-native";
import React from "react";
import CustomText from "@/components/base/CustomText";
import BrokerCard from "./base/BrokerCard";
import { fontFamily } from "@/lib/constants/fonts.constant";

const UserBrokers = () => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 10,
			}}
		>
			<CustomText
				style={{
					fontFamily: fontFamily.Raleway.SemiBold,
					fontSize: 24,
				}}
				content='My Brokers'
			/>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				<View style={{ flexDirection: "row", gap: 10 }}>
					<BrokerCard />
					<BrokerCard />
					<BrokerCard />
					<BrokerCard />
				</View>
			</ScrollView>
		</View>
	);
};

export default UserBrokers;
