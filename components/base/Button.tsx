import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonInterface } from "@/lib/interfaces/Button.interface";
import "../../global.css";

const Button = (prop: ButtonInterface) => {
	return (
		<TouchableOpacity
			onPress={prop.onPress}
			style={{
				paddingVertical:20,
				marginHorizontal:10
			}}
			className={`rounded-full ${
				prop.type === "outline" ? "border-2 border-primary" : "bg-primary"
			} ${prop.style}`}
		>
			<Text
				className={`uppercase text-center  font-nunito-semibold font-semibold  ${
					prop.type === "outline" ? "text-primary" : "text-white-font"
				} ${prop.textStyle}`}
			>
				{prop.title}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;
