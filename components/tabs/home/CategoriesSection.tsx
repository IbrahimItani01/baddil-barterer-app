import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CategoryButton from "./base/CategoryButton";
import CustomText from "@/components/base/CustomText";
import { useAppSelector } from "@/store/hooks";

const CategoriesSection = () => {
	const categories = useAppSelector((state) => state.categories.categories);
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
				renderItem={({ item }) => (
					<CategoryButton
						item={item}
					/>
				)}
			/>
		</View>
	);
};

export default CategoriesSection;

const styles = StyleSheet.create({
	container: {},
	title: {
		fontSize: 18,
		marginBottom: 12,
		fontFamily: `${fontFamily.Raleway.SemiBold}`,
	},
	categoryContainer: {
		flex: 1,
		alignItems: "center",
		marginBottom: 12,
	},
	iconWrapper: {
		width: 60,
		height: 60,
		borderRadius: 12,
		backgroundColor: colors.primary, // Adjust to your theme's primary color
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	categoryText: {
		fontSize: 12,
		textAlign: "center",
	},
});
