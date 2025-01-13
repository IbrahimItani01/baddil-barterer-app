import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TabScreen from "@/components/tabs/base/TabScreen";
import { useLocalSearchParams } from "expo-router";
import { categories } from "@/lib/constants/categories.constant";
import Button from "@/components/base/Button";
import DetailsHeadline from "@/components/tabs/baddil/DetailsHeadline";
import UploadImageSection from "@/components/tabs/baddil/UploadImageSection";
import ItemInputs from "@/components/tabs/baddil/ItemInputs";
import { useAppSelector } from "@/store/hooks";
const DetailsPage = () => {
	const { id, subId } = useLocalSearchParams();
	const category = categories.find((cat) => cat.id === Number(id));
	const subcategory = category?.subcategories.find(
		(sub) => sub.id === Number(subId)
	);

	const { title, location, condition, description, images } = useAppSelector(
		(state) => state.item
	);

	const handleItemAdd = () => {
		// Add item to database
	};
	return (
		<TabScreen title='Details'>
			<View style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.scrollViewContent}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}
				>
					{/* Category and Subcategory */}
					<DetailsHeadline
						category={category}
						subcategory={subcategory}
					/>
					{/* Image Upload Section */}
					<UploadImageSection />
					{/* Item Inputs */}
					<ItemInputs />
					<Button
						disabled={
							!title.trim() ||
							!location.trim() ||
							!condition.trim() ||
							!description.trim() ||
							images.length === 0
						}
						onPress={handleItemAdd}
						title='Add to wallet'
					/>
				</ScrollView>
				{/* Submit Button outside ScrollView for better positioning */}
			</View>
		</TabScreen>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 600,
	},
	scrollViewContent: {
		paddingBottom: 20, // Add space to avoid content being cut off by the button
		flexGrow: 1, // Allow content to grow
	},
});

export default DetailsPage;
