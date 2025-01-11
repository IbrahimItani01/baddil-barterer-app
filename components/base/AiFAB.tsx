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
		<View style={styles.container}>
			<View
				style={{
					position: "relative",
				}}
			>
				<Animated.View style={{ opacity: fadeAnim }}>
					{menuOpen && <AiFABMenu />}
				</Animated.View>
			</View>
			<TouchableOpacity
				onPress={toggleMenu}
				style={styles.fab}
			>
				<MaterialIcons
					name='stream'
					size={30}
					color='#fff'
				/>
			</TouchableOpacity>
		</View>
	);
};

export default AiFAB;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		right: 0,
		alignItems: "center",
	},
	fab: {
		width: 60,
		height: 60,
		backgroundColor: colors.primary,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 3 },
	},
});
