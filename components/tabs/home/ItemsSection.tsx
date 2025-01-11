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
		<View>
			<Text>ItemsSection</Text>
		</View>
	);
};

export default ItemsSection;
