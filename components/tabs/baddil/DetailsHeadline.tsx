import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomText from "@/components/base/CustomText";
import { colors } from "@/lib/constants/colors.constant";
import { capitalizeFirstLetter } from "@/lib/utils/general.utils";
import { fontFamily } from "@/lib/constants/fonts.constant";

interface Category {
	id: number;
	name: string;
	iconName: string;
	subcategories: {
		id: number;
		name: string;
		iconName: string;
	}[];
}

interface Subcategory {
	id: number;
	name: string;
	iconName: string;
}

interface DetailsHeadlineProps {
	category: Category | undefined;
	subcategory: Subcategory | undefined;
}

const DetailsHeadline: React.FC<DetailsHeadlineProps> = ({
	category,
	subcategory,
}) => {
	return (
		<View style={styles.categoryContainer}>
			<View
				style={{
					width: 50,
					height: 50,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 12,
					backgroundColor: colors.primary,
				}}
			>
				<FontAwesome5
					name={category?.iconName || "category"}
					size={30}
					color={colors["white-font"]}
				/>
			</View>
			<View style={styles.categoryTextContainer}>
				<CustomText
					content={`Category: ${capitalizeFirstLetter(category?.name || "")}`}
					style={styles.categoryText}
				/>
				<CustomText
					content={`Subcategory: ${capitalizeFirstLetter(
						subcategory?.name || ""
					)}`}
					style={styles.subcategoryText}
				/>
			</View>
		</View>
	);
};

export default DetailsHeadline;

const styles = StyleSheet.create({
	categoryContainer: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	categoryTextContainer: {
		marginLeft: 10,
		display:'flex',
		flexDirection: 'column',
		gap:5
	},
	categoryText: {
		fontSize: 18,
		fontFamily: fontFamily.NunitoSans.SemiBold
	},
	subcategoryText: {
		fontSize: 12,
		
	},
});
