import { Image, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";

const WelcomeBar = () => {
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user);
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<CustomView style={styles.container}>
			<CustomText
				style={styles.welcomeText}
				content={`Welcome, ${userName ? userName : "John"}!`}
			/>
			{profilePictureUrl ? (
				<Image
					source={{ uri: profilePictureUrl }}
					style={styles.profileImage}
				/>
			) : (
				<MaterialIcons
					name='face'
					color={
						theme === "dark"
							? `${colors["white-font"]}`
							: `${colors["black-font"]}`
					}
					size={30}
				/>
			)}
		</CustomView>
	);
};

export default WelcomeBar;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	welcomeText: {
		fontSize: 24,
		fontFamily: "Raleway-Bold",
	},
	profileImage: {
		width: 45,
		height: 50,
		borderRadius: 50,
	},
});
