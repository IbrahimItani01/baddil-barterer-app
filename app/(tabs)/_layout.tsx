import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "@/components/base/Loader";
import "../../global.css";
import { useAppSelector } from "@/store/hooks";
import { fontFamily } from "@/lib/constants/fonts.constant";

const tabScreenOptions = (theme: "dark" | "light") => ({
	tabBarActiveTintColor: "#E60000",
	tabBarLabelStyle: {
		fontSize: 12,
		fontFamily: `${fontFamily.NunitoSans.Medium}`,
	},
	tabBarStyle: {
		backgroundColor: theme === "dark" ? colors["dark-bg"] : colors["light-bg"],
	},
	headerShown: false,
});

const tabScreensConfig = [
	{
		name: "index",
		title: "Home",
		icon: "home",
		accessibilityLabel: "Home",
		iconSize: 30,
	},
	{
		name: "brokers",
		title: "Brokers",
		icon: "handshake",
		iconSize: 30,
	},
	{
		name: "baddil",
		title: "",
		icon: "add-circle",
		iconSize: 55,
		iconStyle: {
			width: 55,
			height: 55,
			marginBottom: 50,
		},
	},
	{
		name: "chats",
		title: "Chats",
		icon: "chat",
		iconSize: 30,
	},
	{
		name: "profile",
		title: "Profile",
		icon: "account-circle",
		iconSize: 30,
	},
];

export default function TabLayout() {
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<Loader>
			<Tabs screenOptions={tabScreenOptions(theme ?? "light")}>
				{tabScreensConfig.map(
					({ name, title, icon, iconSize, accessibilityLabel, iconStyle }) => (
						<Tabs.Screen
							key={name}
							name={name}
							options={{
								title,
								tabBarIcon: ({ color }) => (
									<MaterialIcons
										name={icon as keyof typeof MaterialIcons.glyphMap}
										color={color}
										size={iconSize}
									/>
								),
								tabBarAccessibilityLabel: accessibilityLabel,
								tabBarIconStyle: iconStyle,
							}}
						/>
					)
				)}
			</Tabs>
		</Loader>
	);
}
