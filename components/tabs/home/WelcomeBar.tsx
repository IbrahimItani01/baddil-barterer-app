import { Image, useColorScheme } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import { MaterialIcons } from "@expo/vector-icons";
import { isValidProfilePictureUrl } from "@/lib/utils/authValidation.utils";
const WelcomeBar = () => {
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user);
	const theme = useColorScheme();

	return (
		<CustomView
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<CustomText
				style={{
					fontSize: 24,
					fontFamily: "Raleway-Bold",
				}}
				content={`Welcome, ${userName ? userName : "John"}!`}
			/>
			{isValidProfilePictureUrl(profilePictureUrl) ? (
				<Image source={{ uri: profilePictureUrl }} />
			) : (
				<MaterialIcons
					name='face'
					color={theme === "dark" ? "#fff" : "#000"}
					size={30}
				/>
			)}
		</CustomView>
	);
};

export default WelcomeBar;
