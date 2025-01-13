import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "@/components/base/CustomText";
import { useRouter } from "expo-router"; // Use the Expo Router for navigation
import { capitalizeFirstLetter } from "@/lib/utils/general.utils";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

// Type for the subcategory
type Subcategory = {
	id: number;
	name: string;
	iconName: string;
};

interface SubcategoryItemInterface {
	subcategory: Subcategory;
	onPress: () => void;
}

const SubcategoryCard = ({
	subcategory,
	onPress,
}: SubcategoryItemInterface) => {
    const theme = useAppSelector((state)=>state.system.colorScheme)
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<CustomText style={{
                    fontSize: 16,
                    fontFamily:fontFamily.NunitoSans.SemiBold
                }} content={capitalizeFirstLetter(subcategory.name)} />
				<MaterialIcons
					name='chevron-right'
					size={24}
					color= {theme==='dark'? colors["white-font"]:colors["black-font"]}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default SubcategoryCard;
