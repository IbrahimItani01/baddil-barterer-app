import React, { ReactNode } from "react";
import CustomView from "@/components/base/CustomView";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainScreenProps {
	children: ReactNode;
}

const MainScreen: React.FC<MainScreenProps> = ({ children }) => {
	return (
		<CustomView mainScreen>
			<SafeAreaView
				style={{
					flex: 1,
					marginTop: 40,
					flexDirection: "column",
					gap: 50,
				}}
			>
				{children}
			</SafeAreaView>
		</CustomView>
	);
};

export default MainScreen;
