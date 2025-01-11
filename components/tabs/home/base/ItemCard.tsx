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
	
