import CustomText from "@/components/base/CustomText";
import TabScreen from "@/components/tabs/base/TabScreen";
import CategoryCard from "@/components/tabs/baddil/CategoryCard";
import { FlatList } from "react-native";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import { Subcategory } from "@/store/slices/categories.slice";

export default function Tab() {
	const router = useRouter();

	const categories = useAppSelector((state) => state.categories.categories);

	const handleCategoryPress = (
		categoryId: string,
		subcategories: Subcategory[]
	) => {
		if (subcategories.length > 0) {
			router.push(`/(tabs)/baddil/(subPages)/Subcategories?id=${categoryId}`);
		} else {
			router.push(`/(tabs)/baddil/(details)/DetailsPage?id=${categoryId}`);
		}
	};

	return (
		<TabScreen title='Baddil'>
			<CustomText
				style={{
					fontFamily: fontFamily.NunitoSans.SemiBold,
				}}
				content='Choose category of your new item'
			/>
			<FlatList
				data={categories}
				style={{
					height: "85%",
					marginTop: 5,
				}}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<CategoryCard
						name={item.name}
						iconName={item.category_icon}
						subcategories={item.subcategories}
						onPress={() =>
							handleCategoryPress(item.id.toString(), item.subcategories)
						}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</TabScreen>
	);
}
