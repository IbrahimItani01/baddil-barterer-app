import CustomView from "@/components/base/CustomView";
import "../../global.css";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/user.slice";
import WelcomeBar from "@/components/tabs/home/WelcomeBar";
import TierProgressBar from "@/components/tabs/home/TierProgressBar";
import CategoriesSection from "@/components/tabs/home/CategoriesSection";
import ItemsSection from "@/components/tabs/home/ItemsSection";
import AiFAB from "@/components/base/AiFAB";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SearchBar from "@/components/tabs/home/SearchBar";

export default function Tab() {
	const dispatch = useDispatch();
	const handlePress = async () => {
		await AsyncStorage.clear();
		dispatch(logout());
		router.replace("/onBoarding");
	};

	return (
		<CustomView
			mainScreen={true}
			style={styles.customView}
		>
			<View style={styles.wrapper}>
				<SafeAreaView style={styles.safeAreaView}>
					<WelcomeBar />
					<TierProgressBar />
					<SearchBar />
					<CategoriesSection />
					<ItemsSection />
					<AiFAB />
				</SafeAreaView>
			</View>
		</CustomView>
	);
}

const styles = StyleSheet.create({
	customView: {
		paddingHorizontal: 15,
	},
	wrapper: {
		marginTop: 45,
	},
	safeAreaView: {
		display: "flex",
		flexDirection: "column",
		marginTop: 15,
		gap: 20,
	},
});
