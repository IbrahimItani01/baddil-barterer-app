import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { Message } from "@/app/(tabs)/chats/(chat)/ChatPage";
import ChatBubble from "./ChatBubble";

interface ChatSectionProps {
	messages: Message[];
}
const ChatSection: React.FC<ChatSectionProps> = ({ messages }) => {
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<ScrollView
			style={{
				height: 515,
				borderTopWidth: 1,
				borderBottomWidth: 1,
				borderColor:
					theme === "dark"
						? colors["dark-gray-dark-theme"]
						: colors["light-gray-light-theme"],
						paddingTop:15
			}}
		>
			{messages.map((msg) => (
				<ChatBubble key={msg.id} isSender={msg.isSender} msg={msg}/>
			))}
		</ScrollView>
	);
};

export default ChatSection;
