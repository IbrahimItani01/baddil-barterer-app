import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import { CategoryItem } from "@/lib/interfaces/home/categories.interface";
import CustomText from "@/components/base/CustomText";

interface CategoryButtonProps {
	item: CategoryItem;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ item }) => {
};

export default CategoryButton;
