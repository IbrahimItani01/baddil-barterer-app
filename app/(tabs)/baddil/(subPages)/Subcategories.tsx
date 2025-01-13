import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "@/components/base/CustomText";
import TabScreen from "@/components/tabs/base/TabScreen";
import { categories } from "@/lib/constants/categories.constant";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons for the chevron icon
import { capitalizeFirstLetter } from "@/lib/utils/general.utils";
import SubcategoryCard from "@/components/tabs/baddil/SubcategoryCard";
import { fontFamily } from "@/lib/constants/fonts.constant";

// Type for the subcategory
type Subcategory = {
	id: number;
	name: string;
	iconName: string;
};

const Subcategories = () => {
	const local = useLocalSearchParams(); // Extract the categoryId from route params
	const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
	const [categoryName, setCategoryName] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		// Find the category by the id
		const category = categories.find(
			(category) => category.id === Number(local.id)
		);
		if (category) {
			setSubcategories(category.subcategories); // Set subcategories if category is found
			setCategoryName(category.name); // Set category name for title
		}
	}, [local.id]);
	
	const handleNavigation = (subcategoryId: number) => {
		router.push(`/(tabs)/baddil/(details)/DetailsPage?id=${local.id}&subId=${subcategoryId}`);
	  };
	  
	return (
		<TabScreen
			title={
				categoryName ? capitalizeFirstLetter(categoryName) : "Subcategories"
			}
		>
			{subcategories.length > 0 ? (
				<>
					<CustomText
						content={`Choose a subcategory for ${capitalizeFirstLetter(
							categoryName
						)}`}
						style={{
							fontFamily: fontFamily.NunitoSans.SemiBold,
						}}
					/>
					{subcategories.map((subcategory) => (
						<SubcategoryCard
							subcategory={subcategory}
							onPress={() => handleNavigation(subcategory.id)}							key={subcategory.id}
						/>
					))}
				</>
			) : (
				<CustomText
					style={{
						fontFamily: fontFamily.NunitoSans.SemiBold,
						fontSize: 16,
						alignSelf: "center",
					}}
					content='No subcategories found'
				/>
			)}
		</TabScreen>
	);
};

export default Subcategories;
