import {
	View,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Easing,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "@/lib/constants/colors.constant";
import { MaterialIcons } from "@expo/vector-icons";
import AiFABMenu from "./AiFABMenu";

const AiFAB = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: menuOpen ? 1 : 0,
			duration: 200,
			useNativeDriver: true,
			easing: Easing.ease,
		}).start();
	}, [menuOpen]);

	return (
		<View>
			<Text>AiFAB</Text>
		</View>
	);
};

export default AiFAB;
