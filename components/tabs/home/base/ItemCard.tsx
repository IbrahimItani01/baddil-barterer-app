import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Barter } from "../ItemsSection";
import { useAppSelector } from "@/store/hooks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const ItemCard = ({ item }: { item: Barter }) => {
	const theme = useAppSelector((state) => state.system.colorScheme);

	const borderBlockColor =
		theme === "dark"
			? colors["dark-gray-dark-theme"]
			: colors["light-gray-light-theme"];

	const handleNavigate = () => {
		console.log("Navigate to item details screen");
		// TODO: route to path with item id
	};
	
	return (
		<TouchableOpacity
			onPress={handleNavigate}
			activeOpacity={0.8}
		>
			<ImageBackground
				source={{
					uri: "https://images.squarespace-cdn.com/content/v1/57f5648637c581229b2e436f/1561988003374-K92XU2EQFH13QJOPOMU2/80-front.jpg?format=1000w",
				}}
				style={[styles.card, { borderColor: borderBlockColor }]}
			>
				<View style={styles.textContainer}>
					<Text style={[styles.title, { color: colors["black-font"] }]}>
						{item.title}
					</Text>
					<Text style={[styles.location, { color: colors["black-font"] }]}>
						{item.location}
					</Text>
				</View>
				<View style={styles.timestampContainer}>
					<MaterialIcons
						name='calendar-today'
						size={16}
						color={colors["black-font"]}
					/>
					<Text style={[styles.timestamp, { color: colors["black-font"] }]}>
						{item.timestamp}
					</Text>
				</View>
				<View style={styles.favoriteIcon}>
					<MaterialIcons
						name={item.favorite ? "favorite" : "favorite-border"}
						size={24}
						color={item.favorite ? colors.primary : colors["black-font"]}
					/>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default ItemCard;

const styles = StyleSheet.create({
	card: {
		borderRadius: 12,
		margin: 8,
		marginLeft: 0,
		width: 280,
		height: 180,
		borderWidth: 1,
		overflow: "hidden",
		position: "relative",
	},

	textContainer: {
		position: "absolute",
		flexDirection: "column",
		gap: 5,
		bottom: 10,
		left: 10,
	},
	timestampContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		position: "absolute",
		right: 10,
		bottom: 10,
	},
	favoriteIcon: {
		position: "absolute",
		right: 10,
		top: 10,
	},
	title: {
		fontSize: 24,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	location: {
		fontSize: 14,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	timestamp: {
		fontFamily: fontFamily.NunitoSans.SemiBold,
		fontSize: 12,
	},
});
