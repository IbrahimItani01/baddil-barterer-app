import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CustomText from "@/components/base/CustomText";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons for fallback face icon
import CustomView from "@/components/base/CustomView";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const ProfileHeader = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user);
	const fallbackProfilePicture =
		profilePictureUrl || "https://via.placeholder.com/100";
	const fallbackUserName = userName || "John Doe";
	return (
		<CustomView style={styles.profileContainer}>
			{/* Profile Picture */}
			{profilePictureUrl ? (
				<Image
					source={{ uri: fallbackProfilePicture }}
					alt='Profile'
					style={styles.profileImage}
				/>
			) : (
				<MaterialIcons
					name='face'
					size={80}
					color={
						theme === "dark"
							? colors["dark-gray-dark-theme"]
							: colors["light-gray-light-theme"]
					}
				/>
			)}
			{/* Name */}
			<CustomText
				style={styles.profileName}
				content={fallbackUserName}
			/>
		</CustomView>
	);
};

export default ProfileHeader;
const styles = StyleSheet.create({
	profileContainer: {
		display: "flex",
		flexDirection: "column",
		marginHorizontal: "auto",
		alignItems: "center",
		gap: 5,
	},
	profileImage: {
		width: "100%",
		height: "100%",
		borderRadius: 50,
	},
	profileName: {
		fontSize: 24,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
});
