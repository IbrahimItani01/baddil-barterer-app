import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";
import QRCodeBubble from "../QRCodeBubble";

interface ChatActionsProps {
	onSendMessage: (message: string) => void;
}

const ChatActions: React.FC<ChatActionsProps> = ({ onSendMessage }) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [message, setMessage] = useState("");
	const [meetupVisible, setMeetupVisible] = useState(false);
	const handleMessageSend = () => {
		if (message.trim()) {
			onSendMessage(message.trim());
			setMessage("");
		}
	};
	const handleMeetupBubble = () => {
		setMeetupVisible(!meetupVisible);
	};
	return (
		<>
			{meetupVisible && (
				<>
					<QRCodeBubble />
				</>
			)}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ position: "absolute", bottom: -35, left: 0, right: 0 }}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						paddingHorizontal: 10,
						paddingVertical: 8,
						gap: 10,
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={handleMeetupBubble}>
						<MaterialIcons
							name='handshake'
							size={30}
							color={colors.primary}
						/>
					</TouchableOpacity>
					<TextInput
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor:
								theme === "dark"
									? colors["dark-gray-dark-theme"]
									: colors["light-gray-light-theme"],
							padding: 10,
							borderRadius: 50,
							fontFamily: fontFamily.NunitoSans.Regular,
							color:
								theme === "dark" ? colors["white-font"] : colors["black-font"],
						}}
						cursorColor={colors.primary}
						placeholderTextColor={
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"]
						}
						placeholder='Write your message ...'
						value={message}
						onChangeText={setMessage}
					/>
					<TouchableOpacity onPress={handleMessageSend}>
						<MaterialIcons
							name='send'
							size={30}
							color={colors.primary}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</>
	);
};

export default ChatActions;
