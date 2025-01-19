import { View, RefreshControl, FlatList, Dimensions } from "react-native";
import React, { useState } from "react";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import BrokerCard from "./base/BrokerCard";
import { colors } from "@/lib/constants/colors.constant";

const screenWidth = Dimensions.get("window").width;
const cardMargin = 10;

const AllBrokers = () => {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);

		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};
	const brokers = Array.from({ length: 10 });

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
				content='Available Brokers'
			/>
			<View style={{ maxHeight: 400 }}>
				<FlatList
					data={brokers}
					numColumns={2}
					keyExtractor={(_, index) => index.toString()}
					columnWrapperStyle={{
						justifyContent: "space-between",
						marginBottom: cardMargin,
						gap: 5,
					}}
					renderItem={() => (
						<View style={{ width: (screenWidth - cardMargin * 3) / 2 }}>
							<BrokerCard hired={false} />
						</View>
					)}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={colors.primary}
						/>
					}
					contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export default AllBrokers;
