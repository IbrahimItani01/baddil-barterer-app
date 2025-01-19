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

// Component for handling custom alert dialogs
interface Props {
	alertFor: "username" | "password" | "profilePicture"; // Type for different alerts
	visible: boolean; // Whether the alert modal is visible or not
	onCancel: () => void; // Callback for cancel action
	onConfirm: (value: string) => void; // Callback for confirm action with value input
}

const CustomAlert = ({ alertFor, visible, onCancel, onConfirm }: Props) => {
	// Retrieving theme and user data from Redux store
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [inputValue, setInputValue] = useState(""); // State for holding input value
	const [selectedImage, setSelectedImage] = useState(""); // State for holding selected image URI
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user); // User data from Redux store
	const dispatch = useAppDispatch();

	// Effect to populate the inputValue when alertFor changes
	useEffect(() => {
		if (alertFor === "username") {
			setInputValue(userName ?? ""); // Set input value to username
		} else if (alertFor === "profilePicture") {
			setInputValue(profilePictureUrl ?? ""); // Set input value to profile picture URL
		}
	}, [alertFor, userName, profilePictureUrl]);

	// Function to handle image selection using the image picker
	const handleImageSelect = async () => {
		const result = await launchImageLibraryAsync({ mediaTypes: ["images"] });
		if (!result.canceled && result.assets && result.assets.length > 0) {
			const imageUri = result.assets[0].uri;
			setSelectedImage(imageUri); // Update the selected image state with URI
		}
	};

	// Handle cancel action (reset states and call onCancel callback)
	const handleCancel = () => {
		setInputValue(""); // Reset input value
		setSelectedImage(""); // Reset selected image
		onCancel(); // Call the onCancel callback passed as prop
	};

	// Handle confirm action (save or update based on alertFor type)
	const handleConfirm = async () => {
		if (alertFor === "profilePicture" && selectedImage) {
			// If it's a profile picture update, handle image upload
			const fileType = selectedImage.split(".").pop()?.toLowerCase();
			const mimeType = fileType === "png" ? "image/png" : "image/jpeg";
			const fileExtension = mimeType.split("/")[1];

			const fileName = `${Date.now()}.${fileExtension}`;
			const formData = new FormData();

			// Append image data to formData
			formData.append("file", {
				uri: selectedImage,
				type: mimeType,
				name: fileName,
			} as unknown as Blob);
			withLoader(dispatch, () => changeProfilePicture(formData)); // Dispatch image upload request
			await fetchProfilePicture(dispatch); // Fetch and update the profile picture
			onCancel(); // Close the alert modal
		} else {
			onConfirm(inputValue); // For username or password, pass the input value to onConfirm
		}
	};

	// Modal for showing the alert
	return (
		<Modal
			visible={visible} // Show modal based on visible prop
			transparent
			animationType='fade'
		>
			<View
				style={[
					styles.overlay,
					{
						backgroundColor:
							theme === "light"
								? "rgba(0, 0, 0, 0.5)" // Semi-transparent dark overlay for light theme
								: "rgba(255, 255, 255, 0.5)", // Semi-transparent light overlay for dark theme
					},
				]}
			>
				<View
					style={[
						styles.alertContainer,
						{
							backgroundColor:
								theme === "dark" ? colors["dark-bg"] : colors["light-bg"], // Set background color based on theme
						},
					]}
				>
					<Text
						style={[
							styles.title,
							{
								color:
									theme === "dark"
										? colors["white-font"] // Set title color based on theme
										: colors["black-font"],
							},
						]}
					>
						{alertFor === "profilePicture"
							? "Upload Profile Picture"
							: alertFor === "username"
							? "Change Username"
							: "Change Password"}{" "}
						{/* Set the modal title based on the alert type */}
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
							{/* Button for selecting profile picture */}
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
							{/* Display message if an image is selected */}
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
						// Input field for username
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
								// Set placeholder text color based on theme
								theme === "dark"
									? colors["dark-gray-dark-theme"]
									: colors["light-gray-light-theme"]
							}
							value={inputValue}
							placeholder={"Enter your new username"} // Placeholder for username input
							onChangeText={setInputValue} // Update input value on change
						/>
					)}
					{/* Button container for cancel and confirm actions */}
					<View style={styles.buttonContainer}>
						{/* Cancel button */}
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
						{/* Confirm button */}
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

// Style definitions for the alert modal and its contents
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
