import { View, Text } from "react-native";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import { categories } from "@/lib/constants/categories.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CategoryButton from "./base/CategoryButton";
import CustomText from "@/components/base/CustomText";

const CategoriesSection = () => {
	return (
		<View style={styles.container}>
			<CustomText
				content='Categories'
				style={styles.title}
			/>
			<FlatList
				data={categories.slice(0, 8)}
				numColumns={4}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <CategoryButton item={item} />}
			/>
		</View>
	);
};

export default CategoriesSection;
