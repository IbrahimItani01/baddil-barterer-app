import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonInterface } from "@/lib/interfaces/Button.interface";
import "../../global.css";

const Button = (prop: ButtonInterface) => {
	return (
		<TouchableOpacity
			onPress={prop.onPress}
			className={`py-4 px-6 m-2 rounded-full ${
				prop.type === "outline" ? "border-2 border-primary" : "bg-primary"
			} ${prop.style}`}
		>
			<Text
				className={`uppercase text-center  font-nunito font-semibold ${
					prop.type === "outline" ? "text-primary" : "text-white-font"
				} ${prop.textStyle}`}
			>
				{prop.title}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;
