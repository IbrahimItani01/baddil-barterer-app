import React from "react";
import CustomView from "@/components/base/CustomView";
import CustomText from "@/components/base/CustomText";
import { Image } from "react-native";
import { fontFamily } from "@/lib/constants/fonts.constant";

const BrokerCardHeader = () => {
	return (
		<CustomView
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 5,
			}}
		>
			<Image
				source={{
					uri: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
				}}
				width={45}
				height={45}
				style={{
					borderRadius: 50,
				}}
			/>
			<CustomView
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: 10,
				}}
			>
				<CustomText
					style={{
						fontSize: 16,
						fontFamily: fontFamily.NunitoSans.SemiBold,
					}}
					content='JohnDoe'
				/>
				<CustomText
					style={{
						fontSize: 12,
						fontFamily: fontFamily.NunitoSans.Regular,
					}}
					content={`$20/hr`}
				/>
			</CustomView>
		</CustomView>
	);
};

export default BrokerCardHeader;
