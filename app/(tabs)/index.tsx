import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import "../../global.css";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/user.slice";
import { Text } from "@rneui/themed";

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
			<CustomText content='home' />
			<Text onPress={handlePress}>Reset</Text>
		</CustomView>
	);
}
