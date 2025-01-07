import React from "react";
import CustomView from "@/components/base/CustomView";
import Logo from "../../../assets/images/base/logo.svg";
import CustomText from "@/components/base/CustomText";

interface HeadlineInterface {
	title: string;
	description: string;
}

const Headline = (props: HeadlineInterface) => {
	return (
		<>
			<CustomView
				style={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Logo />
			</CustomView>
			<CustomView
				style={{
					marginLeft: 15,
					gap: 10,
				}}
			>
				<CustomText
					content={props.title}
					NativeClasses='font-raleway-bold font-bold text-5xl'
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
