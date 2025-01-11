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
import { SafeAreaView } from "react-native-safe-area-context";
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
			style={{
				paddingHorizontal: 15,
				paddingTop: 10,
			}}
		>
			<SafeAreaView
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 15,
				}}
			>
				<WelcomeBar />
				<TierProgressBar />
				<SearchBar />
				{/* TODO: Categories component container */}
				<CategoriesSection />
				{/* TODO: Random Items posted */}
				<ItemsSection />
				{/* TODO: Ai FAB */}
				<AiFAB />
			</SafeAreaView>
		</CustomView>
	);
}
