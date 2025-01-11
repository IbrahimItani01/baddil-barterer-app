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
				content="Recommended Barters"
				style={styles.header}
			/>
			<FlatList
				data={bartersData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}  // Enables horizontal scroll
				showsHorizontalScrollIndicator={false}  // Hides the scrollbar
				// Adjust the card size and spacing here
				contentContainerStyle={styles.flatListContent}
				ItemSeparatorComponent={() => <View style={styles.separator} />}  // Adds space between items
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	header: {
		fontSize: 18,
		marginBottom: 12,
		fontFamily: `${fontFamily.Raleway.SemiBold}`,
	},
	flatListContent: {
		paddingHorizontal: 8, // Adjust padding for better spacing
	},
	separator: {
		width: 16, // Adjust separator width for spacing between cards
	},
});

export default ItemsSection;
