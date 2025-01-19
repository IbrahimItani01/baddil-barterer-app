import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "@/lib/constants/colors.constant";
import CustomText from "./CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CustomView from "./CustomView";
import { useAppSelector } from "@/store/hooks";

interface AiFABMenuIInterface {
	inHome?: boolean;
}

const AiFABMenu = ({ inHome = true }: AiFABMenuIInterface) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const menuContainerStyles = [
		styles.menuContainer,
		{
			borderColor:
				theme === "dark"
					? colors["dark-gray-dark-theme"]
					: colors["light-gray-light-theme"],
		},
	];

	return (
		<TouchableOpacity key={""}>
			<CustomView style={menuContainerStyles}>
				{inHome === true ? (
					<CustomText
						style={styles.menuText}
						content='Recommend Category'
					/>
				) : (
					<>
						<CustomText
							style={styles.menuText}
							content='Pick from wallet'
						/>
						<CustomText
							style={styles.menuText}
							content='Success Chance'
						/>
						<CustomText
							style={styles.menuText}
							content='Barterer Credibility'
						/>
					</>
				)}
			</CustomView>
		</TouchableOpacity>
	);
};

export default AiFABMenu;

const styles = StyleSheet.create({
	menuContainer: {
		position: "absolute",
		bottom: 5,
		right: -20,
		padding: 20,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: colors["light-gray-light-theme"],
		shadowColor: "#000", // Shadow color
		shadowOffset: { width: 0, height: 4 }, // Shadow offset for iOS
		shadowOpacity: 0.1, // Shadow opacity for iOS
		shadowRadius: 4, // Shadow blur radius for iOS
		elevation: 5, // Elevation for Android
	},
	menuText: {
		fontSize: 16,
		fontFamily: fontFamily.NunitoSans.SemiBold,
		color: colors["white-font"],
		backgroundColor: colors.primary,
		padding: 10,
		width: "100%",
		textAlign: "center",
		borderRadius: 8,
	},
});
