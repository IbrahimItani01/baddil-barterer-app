import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TabScreen from "@/components/tabs/base/TabScreen";
import { useLocalSearchParams } from "expo-router";
import Button from "@/components/base/Button";
import DetailsHeadline from "@/components/tabs/baddil/DetailsHeadline";
import UploadImageSection from "@/components/tabs/baddil/UploadImageSection";
import ItemInputs from "@/components/tabs/baddil/ItemInputs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/wallet.slice";
import CustomText from "@/components/base/CustomText";

const DetailsPage = () => {
	const { id, subId } = useLocalSearchParams();

	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.categories.categories);
	const walletState = useAppSelector((state) => state.wallets.items);

	const category = categories.find((cat) => cat.id === id); // Assuming id is already a string
	const subcategory = category?.subcategories.find((sub) => sub.id === subId);

	const walletItems = useAppSelector((state) => state.wallets.items); // Access the items array
	const currentItem = walletItems.find((item) => item.id === id); // Select an item if it's for editing

	// Manage form state for adding a new item
	const [title, setTitle] = React.useState("");
	const [location, setLocation] = React.useState("");
	const [condition, setCondition] = React.useState("");
	const [description, setDescription] = React.useState("");

	  const handleItemAdd = () => {
	    if (title && location && condition && description) {
	      dispatch(
	        addItem({
	          id: String(new Date().getTime()), // Simple ID for demo purposes
	          name: title,
	          description,
	          category_id: String(category?.id),
	          subcategory_id: String(subcategory?.id),
	          condition,
	          location_id: location,
	          wallet_id: "", // Replace with wallet ID as needed
	          value: 0, // Replace as needed
	          created_at: new Date(),
	          updated_at: new Date(),
	        })
	      );
	      alert("Item successfully added to wallet.");
	    }
	  };

	return (
		<TabScreen title='Details'>
			<View style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.scrollViewContent}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}
				>
					<DetailsHeadline
						category={category}
						subcategory={subcategory}
					/>
					<UploadImageSection />
					<ItemInputs />
					<Button
						disabled={
							!title.trim() ||
							!location.trim() ||
							!condition.trim() ||
							!description.trim()
						}
						onPress={handleItemAdd}
						title='Add to wallet'
					/>
				</ScrollView>
			</View>
		</TabScreen>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 580,
	},
	scrollViewContent: {
		paddingBottom: 20,
		flexGrow: 1,
	},
});

export default DetailsPage;
