import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "@/components/base/Loader";

export default function TabLayout() {
	const theme = useColorScheme();

	return (
		<Loader>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#E60000",
					tabBarLabelStyle: { fontSize: 12, fontFamily: "NunitoSans-Medium" },
					tabBarStyle: {
						backgroundColor:
							theme === "dark"
								? `${colors["dark-bg"]}`
								: `${colors["light-bg"]}`,
					},
					headerShown: false,
				}}
			>
			</Tabs>
		</Loader>
	);
}
