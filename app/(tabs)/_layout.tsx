import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "@/components/base/Loader";
import '../../global.css'

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
				<Tabs.Screen
					name='index'
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<MaterialIcons
								name={"home"}
								color={color}
								size={30}
							/>
						),
						tabBarAccessibilityLabel: "Home",
					}}
				/>

				<Tabs.Screen
					name='brokers'
					options={{
						title: "Brokers",
						tabBarIcon: ({ color, focused }) => (
							<MaterialIcons
								name={"handshake"}
								color={color}
								size={30}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name='baddil'
					options={{
						title: "",
						tabBarIcon: ({ color, focused }) => (
							<MaterialIcons
								name={"add-circle"}
								color={color}
								size={55}
							/>
						),
						tabBarIconStyle: {
							width: 55,
							height: 55,
							marginBottom: 50,
						},
					}}
				/>

				<Tabs.Screen
					name='chats'
					options={{
						title: "Chats",
						tabBarIcon: ({ color, focused }) => (
							<MaterialIcons
								name={"chat"}
								color={color}
								size={30}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name='profile'
					options={{
						title: "Profile",
						tabBarIcon: ({ color, focused }) => (
							<MaterialIcons
								name={"account-circle"}
								color={color}
								size={30}
							/>
						),
					}}
				/>
			</Tabs>
		</Loader>
	);
}
