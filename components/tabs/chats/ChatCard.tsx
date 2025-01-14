import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "@/components/base/CustomText";
import { colors } from "@/lib/constants/colors.constant";
import { Divider } from "react-native-paper";
import { fontFamily } from "@/lib/constants/fonts.constant";

interface ChatCardInterface{
	onPress: (chatId:string) => void;
	chatId: string
}

const ChatCard = ({chatId,onPress}: ChatCardInterface) => {
	return (
		<View
			style={{
				display: "flex",
				gap: 5,
				padding: 5,
				marginBottom: 10,
			}}
		>
			<TouchableOpacity onPress={()=>onPress(chatId)}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<Image
							style={{
								borderRadius: "50%",
							}}
							source={{
								uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s",
							}}
							width={50}
							height={50}
						/>
						<View
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginLeft: 10,
							}}
						>
							<CustomText
								style={{
									fontFamily: fontFamily.NunitoSans.SemiBold,
									fontSize: 16,
								}}
								content='Ibrahim Itani'
							/>
							<CustomText
								style={{
									fontFamily: fontFamily.NunitoSans.Regular,
									fontSize: 12,
								}}
								content='Hi I saw your ps4 post'
							/>
						</View>
					</View>
					<View
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<CustomText content='Monday' />
						<View
							style={{
								backgroundColor: colors.primary,
								width: 15,
								height: 15,
								borderRadius: "50%",
								alignSelf: "flex-end",
							}}
						/>
					</View>
				</View>
				<Divider
					style={{
						marginLeft: 50,
                        marginTop:5
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default ChatCard;
