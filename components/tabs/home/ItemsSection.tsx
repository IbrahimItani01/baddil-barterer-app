import { View, Text } from "react-native";
import React from "react";
export interface Barter {
	id: string;
	title: string;
	location: string;
	timestamp: string;
	favorite: boolean;
}

const ItemsSection = () => {
	return (
		<View>
			<Text>ItemsSection</Text>
		</View>
	);
};

export default ItemsSection;
