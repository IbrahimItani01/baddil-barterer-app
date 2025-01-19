import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import CustomView from "@/components/base/CustomView";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatHeader from "@/components/tabs/chats/base/ChatHeader";
import ChatSection from "@/components/tabs/chats/base/ChatSection";
import ChatActions from "@/components/tabs/chats/base/ChatActions";
export type Message = {
	id: number;
	text: string;
	isSender: boolean;
};
const ChatPage = () => {
	const { id } = useLocalSearchParams();
	const [messages, setMessages] = useState<Message[]>([
		{ id: 1, text: "Hello", isSender: true },
		{ id: 2, text: "Hi", isSender: false },
	]);

	const addMessage = (message: string): void => {
		setMessages((prevMessages: Message[]) => [
			...prevMessages,
			{ id: Date.now(), text: message, isSender: true },
		]);
	};

	return (
		<CustomView mainScreen>
			<SafeAreaView
				style={{ display: "flex", flexDirection: "column", gap: 20 }}
			>
				<ChatHeader />
				<ChatSection messages={messages} />
				<ChatActions onSendMessage={addMessage} />
			</SafeAreaView>
		</CustomView>
	);
};

export default ChatPage;
