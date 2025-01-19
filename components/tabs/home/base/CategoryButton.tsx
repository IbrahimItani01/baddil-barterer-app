import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { Category } from "@/store/slices/categories.slice";

interface CategoryButtonProps {
	item: Category;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ item }) => {
	return (
		<TouchableOpacity style={styles.categoryContainer}>
			<View style={styles.iconWrapper}>
				<FontAwesome5
					name={item.category_icon}
					size={24}
					color='#fff'
				/>
			</View>
			<CustomText
				content={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
				style={styles.categoryText}
			/>
		</TouchableOpacity>
	);
};

export default CategoryButton;

const styles = StyleSheet.create({
	categoryContainer: {
		flex: 1,
		alignItems: "center",
		marginBottom: 12,
	},
	iconWrapper: {
		width: 60,
		height: 60,
		borderRadius: 12,
		backgroundColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
	},
	categoryText: {
		fontSize: 12,
		textAlign: "center",
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
});
