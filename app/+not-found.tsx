import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import CustomLink from "@/components/base/CustomLink";
import '../global.css'

export default function NotFoundScreen() {
	return (
		<>
			<CustomView NativeClasses='h-full w-full flex flex-col justify-center items-center'>
				<View className='flex flex-col items-center mb-20 gap-3'>
					<MaterialIcons
						name='error'
						size={80}
						color={"#E60000"}
					/>
					<CustomText
						NativeClasses={" text-2xl raleway font-semibold"}
						content={"Page Not-Found"}
					/>
				</View>
				<CustomLink NativeClasses="nunito font-bold uppercase w-full text-center text-primary" href={"back"} content="return"/>
			</CustomView>
		</>
	);
}
