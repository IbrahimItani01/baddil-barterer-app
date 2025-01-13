import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import CustomText from "@/components/base/CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addImage, removeImage } from "@/store/slices/items.slice";
import * as ImagePicker from "expo-image-picker";

const UploadImageSection: React.FC = () => {
	const dispatch = useAppDispatch();
	const images = useAppSelector((state) => state.item.images);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			quality: 0.7,
			base64: false,
		});

		if (!result.canceled && result.assets && result.assets[0].uri) {
			dispatch(addImage(result.assets[0].uri));
		}
	};

	const deleteImage = (uri: string) => {
		dispatch(removeImage(uri));
	};

	return (
		<View style={styles.imageUploadContainer}>
			<CustomText
				content='Add 5 images to value your item'
				style={styles.imageUploadText}
			/>
			<TouchableOpacity onPress={pickImage}>
				<View style={styles.addImageButton}>
					<MaterialIcons
						name='add-photo-alternate'
						size={48}
						color='gray'
					/>
					<CustomText
						content='Add images'
						style={styles.addImageText}
					/>
					<CustomText
						content='5MB max, jpg or png only'
						style={styles.imageSizeText}
					/>
				</View>
			</TouchableOpacity>
			<View style={styles.imagePreviewContainer}>
				{images.map((uri, index) => (
					<View
						key={index}
						style={styles.imagePreview}
					>
						<Image
							source={{ uri }}
							style={styles.image}
						/>
						<TouchableOpacity
							onPress={() => deleteImage(uri)}
							style={styles.removeImageButton}
						>
							<MaterialIcons
								name='close'
								size={16}
								color='white'
							/>
						</TouchableOpacity>
					</View>
				))}
			</View>
		</View>
	);
};

export default UploadImageSection;

const styles = StyleSheet.create({
	imageUploadContainer: {
		marginBottom: 24,
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	imageUploadText: {
		textAlign: "center",
		color: "#6B7280",
	},
	addImageButton: {
		marginTop: 16,
		borderStyle: "dashed",
		borderWidth: 2,
		borderColor: "#D1D5DB",
		padding: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	addImageText: {
		marginTop: 8,
		fontSize: 12,
	},
	imageSizeText: {
		fontSize: 10,
		color: "#9CA3AF",
	},
	imagePreviewContainer: {
		flexDirection: "row",
		marginTop: 16,
	},
	imagePreview: {
		position: "relative",
		marginRight: 8,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 8,
	},
	removeImageButton: {
		position: "absolute",
		top: 0,
		right: 0,
		backgroundColor: "#EF4444",
		padding: 4,
		borderRadius: 50,
	},
});
