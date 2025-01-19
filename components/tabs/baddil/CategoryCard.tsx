import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomText from "@/components/base/CustomText";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { useAppSelector } from "@/store/hooks";
import { Subcategory } from "@/store/slices/categories.slice";

type CategoryCardProps = {
	name: string;
	iconName: string;
	subcategories: Subcategory[];
	backgroundColor?: string;
	onPress: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
	name,
	iconName,
	subcategories,
	onPress,
}) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.card]}
		>
			<View style={styles.iconContainer}>
				<FontAwesome5
					name={iconName}
					size={24}
					color='#fff'
				/>
			</View>
			<View style={styles.textContainer}>
				<CustomText
					content={name.charAt(0).toUpperCase() + name.slice(1)}
					style={styles.title}
				/>
				{subcategories.length > 0 && (
					<CustomText
						content={`& ${subcategories[0].name}`}
						style={styles.subtitle}
					/>
				)}
			</View>
			<FontAwesome5
				name='chevron-right'
				size={18}
				color={theme === "dark" ? colors["white-font"] : colors["black-font"]}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		paddingLeft: 0,
	},
	iconContainer: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 10,
		width: 55,
		height: 55,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	subtitle: {
		fontSize: 12,
		fontFamily: fontFamily.NunitoSans.Medium,
	},
});

export default CategoryCard;
