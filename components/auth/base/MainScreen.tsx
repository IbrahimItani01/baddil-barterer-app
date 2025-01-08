import React, { ReactNode } from "react";
import CustomView from "@/components/base/CustomView";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleProp, ViewStyle } from "react-native";

interface MainScreenProps {
	children: ReactNode;
	style: StyleProp<ViewStyle>;
}

const MainScreen: React.FC<MainScreenProps> = ({ style, children }) => {
	return (
		<CustomView mainScreen>
			<SafeAreaView style={style}>{children}</SafeAreaView>
		</CustomView>
	);
};

export default MainScreen;
