import TabScreen from "@/components/tabs/base/TabScreen";
import ChatCard from "@/components/tabs/chats/ChatCard";
import ChatsFilter from "@/components/tabs/chats/ChatsFilter";
import SearchBar from "@/components/tabs/home/SearchBar";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function Tab() {
	const router = useRouter();
	const handleChatOpen = (chatId: string) => {
		router.push(`/(tabs)/chats/(chat)/ChatPage?id=${chatId}`);
	};

	return (
		<TabScreen
			title='Chats'
			style={{ display: "flex" }}
		>
			<SearchBar />
			<ChatsFilter />
			<ScrollView
				style={{
					height: 450,
				}}
				showsVerticalScrollIndicator={false}
			>
				<ChatCard
					chatId={"21"}
					onPress={handleChatOpen}
				/>
			</ScrollView>
		</TabScreen>
	);
}
