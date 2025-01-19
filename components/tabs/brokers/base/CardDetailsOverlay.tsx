import React from "react";
import {
	Modal,
	View,
	TouchableWithoutFeedback,
	StyleSheet,
	Image,
} from "react-native";
import CustomText from "@/components/base/CustomText";
import { colors } from "@/lib/constants/colors.constant";
import { useAppSelector } from "@/store/hooks";
import CustomView from "@/components/base/CustomView";
import { fontFamily } from "@/lib/constants/fonts.constant";
import Button from "@/components/base/Button";

interface CardDetailsOverlayProps {
	visible: boolean;
	onClose: () => void;
	isHired: boolean;
}

const CardDetailsOverlay: React.FC<CardDetailsOverlayProps> = ({
	visible,
	onClose,
	isHired,
}) => {
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<Modal
			transparent
			visible={visible}
			animationType='fade'
		>
			<TouchableWithoutFeedback onPress={onClose}>
				<View
					style={[
						styles.overlay,
						{
							backgroundColor:
								theme === "light"
									? "rgba(0, 0, 0, 0.5)"
									: "rgba(255, 255, 255, 0.5)",
						},
					]}
				>
					<TouchableWithoutFeedback>
						<View
							style={[
								styles.cardContainer,
								{
									backgroundColor:
										theme === "light" ? colors["light-bg"] : colors["dark-bg"],
									shadowColor:
										theme === "light" ? colors["dark-bg"] : colors["light-bg"],
								},
							]}
						>
							{/* Profile Image */}
							<View style={styles.profileContainer}>
								<Image
									source={{
										uri: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
									}}
									style={styles.profileImage}
								/>
								<CustomText
									content='John Doe'
									style={styles.name}
								/>
								<CustomText
									content='Your trusted broker!'
									style={styles.subtitle}
								/>
							</View>

							{/* Stats */}
							<View style={styles.statsContainer}>
								<CustomView>
									<CustomText
										content='10'
										style={styles.statValue}
									/>
									<CustomText
										content='Barters'
										style={styles.statTitle}
									/>
								</CustomView>
								<CustomView>
									<CustomText
										content='1.5k'
										style={styles.statValue}
									/>
									<CustomText
										content='Reviews'
										style={styles.statTitle}
									/>
								</CustomView>
								<CustomView>
									<CustomText
										content='10'
										style={styles.statValue}
									/>
									<CustomText
										content='$/hr'
										style={styles.statTitle}
									/>
								</CustomView>
							</View>

							<Button title={isHired ? "Chat" : "Hire"} />
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardContainer: {
		width: "90%",
		height: "50%",
		padding: 20,
		borderRadius: 12,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5,
		display: "flex",
		justifyContent: "space-between",
	},
	profileContainer: {
		alignItems: "center",
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 10,
	},
	name: {
		fontSize: 24,
		marginBottom: 5,
		fontFamily: fontFamily.NunitoSans.Bold,
	},
	subtitle: {
		fontSize: 14,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	statsContainer: {
		display: "flex",
		flexDirection: "row",
		marginHorizontal: "auto",
		gap: 40,
	},

	statTitle: {
		fontFamily: fontFamily.NunitoSans.SemiBold,
		color: colors.primary,
		fontSize: 16,
	},
	statValue: {
		fontSize: 24,
		textAlign: "center",
		fontFamily: fontFamily.NunitoSans.Bold,
	},
	hireButton: {
		backgroundColor: colors.primary,
		paddingVertical: 10,
		borderRadius: 8,
		alignItems: "center",
	},
	hireButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default CardDetailsOverlay;
