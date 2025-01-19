import { View, FlatList, StyleSheet } from "react-native";
import React from "react";
import { bartersData } from "@/lib/constants/barters.constant";
import ItemCard from "./base/ItemCard";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";

export interface Barter {
	id: string;
	title: string;
	location: string;
	timestamp: string;
	favorite: boolean;
}

const ItemsSection = () => {
	const renderItem = ({ item }: { item: Barter }) => {
		return <ItemCard item={item} />;
	};

	return (
		<View style={styles.container}>
			<CustomText
				content='Recommended Barters'
				style={styles.header}
			/>
			<FlatList
				data={bartersData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatListContent}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
};

export default ItemsSection;

const styles = StyleSheet.create({
	container: {},
	header: {
		fontSize: 18,
		marginBottom: 12,
		fontFamily: `${fontFamily.Raleway.SemiBold}`,
	},
	flatListContent: {
		paddingHorizontal: 8,
	},
	separator: {
		width: 16,
	},
});
