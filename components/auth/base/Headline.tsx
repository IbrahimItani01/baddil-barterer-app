import React from "react";
import CustomView from "@/components/base/CustomView";
import Logo from "../../../assets/images/base/logo.svg";
import CustomText from "@/components/base/CustomText";
import { StyleProp, ViewStyle } from "react-native";

interface HeadlineInterface {
	title: string;
	description: string;
	logoStyle: StyleProp<ViewStyle>;
	headlineStyle: StyleProp<ViewStyle>;
}

const Headline = (props: HeadlineInterface) => {
	return (
		<>
			<CustomView style={props.logoStyle}>
				<Logo />
			</CustomView>
			<CustomView style={props.headlineStyle}>
				<CustomText
					content={props.title}
					NativeClasses='font-raleway-bold font-bold text-4xl'
				/>
				<CustomText
					NativeClasses='font-nunito-semibold font-semibold'
					content={props.description}
				/>
			</CustomView>
		</>
	);
};

export default Headline;
