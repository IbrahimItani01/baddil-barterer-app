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
			NativeClasses='flex justify-center items-center'
		>
			{/* TODO: welcome component with profile image shower */}
			<WelcomeBar />
			{/* TODO: Tier Progress Component */}
			<TierProgressBar />
			{/* TODO: Categories component container */}
			<CategoriesSection />
			{/* TODO: Random Items posted */}
			<ItemsSection />
			{/* TODO: Ai FAB */}
			<AiFAB />
		</CustomView>
	);
}
