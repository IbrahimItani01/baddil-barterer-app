import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import BrokerCardActions from "./BrokerCardActions";
import BrokerCardHeader from "./BrokerCardHeader";
import CardDetailsOverlay from "./CardDetailsOverlay";
import CustomView from "@/components/base/CustomView";

interface BrokerCardInterface {
	hired?: boolean;
}
const BrokerCard = ({ hired = true }: BrokerCardInterface) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const toggleOverlay = () => setIsOverlayVisible((prev) => !prev);
	const handleCardOpen = () => {
		// handle card open logic here
		console.log("card info");
		toggleOverlay();
	};
	return (
		<>
			<TouchableOpacity onPress={handleCardOpen}>
				<CustomView
					style={{
						position: "relative",
						width: hired ? 200 : 165, // Conditional width
						height: 110, // Conditional height
						padding: 10,
						borderRadius: 12,
						borderWidth: 2,
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					}}
				>
					<BrokerCardHeader />
					<BrokerCardActions hired={hired} />
				</CustomView>
			</TouchableOpacity>
			{isOverlayVisible && (
				<CardDetailsOverlay
					isHired={hired}
					visible={isOverlayVisible}
					onClose={toggleOverlay}
				/>
			)}
		</>
	);
};

export default BrokerCard;
