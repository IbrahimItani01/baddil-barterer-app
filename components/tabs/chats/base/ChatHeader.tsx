import { View, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import CustomText from "@/components/base/CustomText";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const ChatHeader = () => {
	const [isFlagged, setIsFlagged] = useState(false);

	const toggleFlag = () => {
		if (isFlagged) {
			Alert.alert("Note!", "You unFlagged this chat!");
		} else {
			Alert.alert("Note!", "You Flagged this chat!");
		}
		setIsFlagged((prev) => !prev);
	};
	const router = useRouter();
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<View style={styles.headerContainer}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 15,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<FontAwesome5
						name='chevron-left'
						size={24}
						color={colors.primary}
					/>
				</TouchableOpacity>
				<View style={styles.profileContainer}>
					<Image
						style={styles.profileImage}
						source={{
							uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
						}}
						width={50}
						height={50}
					/>
					<CustomText
						style={styles.profileText}
						content='Ibrahim Itani'
					/>
				</View>
			</View>
			<TouchableOpacity onPress={toggleFlag}>
				<MaterialIcons
					name='flag'
					size={30}
					color={
						isFlagged
							? colors.primary
							: theme == "dark"
							? colors["dark-gray-dark-theme"]
							: colors["light-gray-light-theme"]
					}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default ChatHeader;
const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 15,
		paddingHorizontal: 16,
	},
	profileContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	profileImage: {
		borderRadius: 25,
		width: 50,
		height: 50,
	},
	profileText: {
		fontSize: 16,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
});
