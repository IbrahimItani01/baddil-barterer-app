import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Modal,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CustomText from "@/components/base/CustomText";
import { launchImageLibraryAsync } from "expo-image-picker";
import { changeProfilePicture } from "@/apis/routes/user/user.routes";
import { withLoader } from "@/lib/utils/async.utils";
import { fetchProfilePicture } from "@/lib/utils/system.utils";

interface Props {
	alertFor: "username" | "password" | "profilePicture";
	visible: boolean;
	onCancel: () => void;
	onConfirm: (value: string) => void;
}

const CustomAlert = ({ alertFor, visible, onCancel, onConfirm }: Props) => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [inputValue, setInputValue] = useState("");
	const [selectedImage, setSelectedImage] = useState("");
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (alertFor === "username") {
			setInputValue(userName ?? "");
		} else if (alertFor === "profilePicture") {
			setInputValue(profilePictureUrl ?? "");
		}
	}, [alertFor, userName, profilePictureUrl]);

	const handleImageSelect = async () => {
		const result = await launchImageLibraryAsync({ mediaTypes: ["images"] });
		if (!result.canceled && result.assets && result.assets.length > 0) {
			const imageUri = result.assets[0].uri;
			setSelectedImage(imageUri);
		}
	};
	const handleCancel = () => {
		// Reset inputs and clear selected image
		setInputValue("");
		setSelectedImage("");
		onCancel(); // Call the provided onCancel handler
	};
	const handleConfirm = async () => {
		if (alertFor === "profilePicture" && selectedImage) {
			const fileType = selectedImage.split(".").pop()?.toLowerCase();
			const mimeType = fileType === "png" ? "image/png" : "image/jpeg";
			const fileExtension = mimeType.split("/")[1];

			const fileName = `${Date.now()}.${fileExtension}`;
			const formData = new FormData();

			formData.append("file", {
				uri: selectedImage,
				type: mimeType,
				name: fileName,
			} as unknown as Blob);
			withLoader(dispatch, () => changeProfilePicture(formData));
			await fetchProfilePicture(dispatch);
			onCancel(); // Close the modal after updating
		} else {
			onConfirm(inputValue); // Handle other alerts
		}
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType='fade'
		>
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
				<View
					style={[
						styles.alertContainer,
						{
							backgroundColor:
								theme === "dark" ? colors["dark-bg"] : colors["light-bg"],
						},
					]}
				>
					<Text
						style={[
							styles.title,
							{
								color:
									theme === "dark"
										? colors["white-font"]
										: colors["black-font"],
							},
						]}
					>
						{alertFor === "profilePicture"
							? "Upload Profile Picture"
							: alertFor === "username"
							? "Change Username"
							: "Change Password"}
					</Text>
					{alertFor === "password" ? (
						<CustomText
							style={{
								fontFamily: fontFamily.NunitoSans.Medium,
								marginVertical: 15,
								textAlign: "center",
							}}
							content='Confirm to send password reset email!'
						/>
					) : alertFor === "profilePicture" ? (
						<>
							<TouchableOpacity
								onPress={handleImageSelect}
								style={[
									styles.selectButton,
									{
										borderColor:
											theme === "dark"
												? colors["dark-gray-dark-theme"]
												: colors["light-gray-light-theme"],
									},
								]}
							>
								<Text
									style={{
										color:
											theme === "dark"
												? colors["white-font"]
												: colors["black-font"],
									}}
								>
									{selectedImage ? "Change Selected Image" : "Select Image"}
								</Text>
							</TouchableOpacity>
							{selectedImage && (
								<Text
									style={{
										fontFamily: fontFamily.NunitoSans.Bold,
										marginVertical: 20,
										color: colors.primary,
										textAlign: "center",
									}}
								>
									Image selected!
								</Text>
							)}
						</>
					) : (
						<TextInput
							style={[
								styles.input,
								{
									borderColor:
										theme === "dark"
											? colors["dark-gray-dark-theme"]
											: colors["light-gray-light-theme"],
									color:
										theme === "dark"
											? colors["white-font"]
											: colors["black-font"],
								},
							]}
							placeholderTextColor={
								theme === "dark"
									? colors["dark-gray-dark-theme"]
									: colors["light-gray-light-theme"]
							}
							value={inputValue}
							placeholder={"Enter your new username"}
							onChangeText={setInputValue}
						/>
					)}
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[
								styles.cancelButton,
								{
									backgroundColor:
										theme === "dark"
											? colors["dark-gray-dark-theme"]
											: colors["light-gray-light-theme"],
								},
							]}
							onPress={handleCancel}
						>
							<Text
								style={[
									styles.cancelButtonText,
									{
										color:
											theme === "dark"
												? colors["white-font"]
												: colors["black-font"],
									},
								]}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.confirmButton}
							onPress={handleConfirm}
						>
							<Text style={styles.confirmButtonText}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default CustomAlert;

const styles = StyleSheet.create({
	overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
	alertContainer: { width: "80%", padding: 20, borderRadius: 10 },
	title: {
		fontFamily: fontFamily.NunitoSans.Bold,
		fontSize: 20,
		marginHorizontal: "auto",
	},
	input: {
		backgroundColor: "transparent",
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		marginVertical: 20,
	},
	selectButton: {
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		alignItems: "center",
		marginVertical: 30,
	},
	buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
	cancelButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5 },
	cancelButtonText: { fontFamily: fontFamily.NunitoSans.SemiBold },
	confirmButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: colors["primary"],
		borderRadius: 5,
	},
	confirmButtonText: {
		color: colors["white-font"],
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
});
