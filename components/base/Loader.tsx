import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useCustomFonts } from "@/hooks/fonts.hook";
import { CustomWrapper } from "@/lib/interfaces/Wrapper.interface";

const Loader: React.FC<CustomWrapper> = ({ children, color, size }) => {
	const fontsLoaded = useCustomFonts();

	if (!fontsLoaded) {
		return (
			<View className='flex-1 items-center justify-center'>
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
