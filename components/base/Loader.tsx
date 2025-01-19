import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/fonts.hook";
import { CustomWrapper } from "@/lib/interfaces/Wrapper.interface";

const Loader: React.FC<CustomWrapper> = ({ children, color, size }) => {
	
	const fontsLoaded = useCustomFonts();

	if (!fontsLoaded) {
		return (
			<View style={styles.container}>
				<ActivityIndicator
					size={size}
					color={color}
				/>
			</View>
		);
	}

	return <>{children}</>;
};

export default Loader;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
