import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { Message } from "@/app/(tabs)/chats/(chat)/ChatPage";

interface ChatBubbleInterface {
	msg: Message;
	isSender: boolean;
}
const ChatBubble = ({ msg, isSender }: ChatBubbleInterface) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	return (
		<View
			key={msg.id}
			style={{
				padding: 10,
				margin: 5,
				backgroundColor: isSender
					? colors.primary
					: theme === "dark"
					? colors["dark-gray-dark-theme"]
					: colors["light-gray-light-theme"],
				borderRadius: 15,
				alignSelf: isSender ? "flex-end" : "flex-start",
				maxWidth: "75%",
			}}
		>
			<Text
				style={{
					color: !isSender
						? theme === "dark"
							? colors["white-font"]
							: colors["black-font"]
						: colors["white-font"],
					fontFamily: fontFamily.NunitoSans.Regular,
				}}
			>
				{msg.text}
			</Text>
		</View>
	);
};

export default ChatBubble;
