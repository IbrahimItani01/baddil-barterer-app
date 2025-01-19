import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Modal,
	FlatList,
	Text,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import CustomText from "@/components/base/CustomText";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const ItemInputs = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const locations = useAppSelector((state) => state.locations.locations);

	const [form, setForm] = React.useState({
		title: "",
		description: "",
		location: "",
		condition: "",
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState("");

	const handleInputChange = (field: string, value: string) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleLocationSelect = (locationId: string, locationName: string) => {
		setSelectedLocation(locationName);
		handleInputChange("location", locationId);
		setModalVisible(false);
	};

	return (
		<View>
			<CustomText
				content='Title'
				style={styles.inputLabel}
			/>
			<TextInput
				style={[
					styles.input,
					{
						color:
							theme === "dark" ? colors["white-font"] : colors["black-font"],
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					},
				]}
				placeholder='Enter item title'
				value={form.title}
				onChangeText={(value) => handleInputChange("title", value)}
			/>

			<CustomText
				content='Location'
				style={styles.inputLabel}
			/>
			<TouchableOpacity
				style={[
					styles.input,
					{
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					},
				]}
				onPress={() => setModalVisible(true)}
			>
				<Text
					style={{
						color: form.location
							? colors["black-font"]
							: colors["dark-gray-dark-theme"],
					}}
				>
					{selectedLocation || "Select location"}
				</Text>
			</TouchableOpacity>

			<Modal
				visible={modalVisible}
				animationType='slide'
				transparent
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<FlatList
							data={locations}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.modalItem}
									onPress={() => handleLocationSelect(item.id, item.name)}
								>
									<Text style={styles.modalItemText}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>
						<TouchableOpacity
							style={styles.closeModalButton}
							onPress={() => setModalVisible(false)}
						>
							<Text style={styles.closeModalButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<CustomText
				content='Condition'
				style={styles.inputLabel}
			/>
			<View style={styles.conditionContainer}>
				{["New", "Used", "Refurbished"].map((option) => (
					<TouchableOpacity
						key={option}
						onPress={() =>
							handleInputChange(
								"condition",
								form.condition === option ? "" : option
							)
						}
						style={[
							styles.conditionButton,
							form.condition === option && styles.selectedCondition,
							{
								borderColor:
									theme === "dark"
										? colors["dark-gray-dark-theme"]
										: colors["light-gray-light-theme"],
							},
						]}
					>
						<CustomText
							style={[
								form.condition === option
									? styles.selectedConditionText
									: styles.conditionText,
							]}
							content={option}
						/>
					</TouchableOpacity>
				))}
			</View>

			<CustomText
				content='Description'
				style={styles.inputLabel}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={100}
			>
				<TextInput
					style={[
						styles.textArea,
						{
							color:
								theme === "dark" ? colors["white-font"] : colors["black-font"],
							borderColor:
								theme === "dark"
									? colors["dark-gray-dark-theme"]
									: colors["light-gray-light-theme"],
						},
					]}
					placeholder='Describe the item you are bartering...'
					value={form.description}
					onChangeText={(value) => handleInputChange("description", value)}
					multiline
				/>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ItemInputs;

const styles = StyleSheet.create({
	inputLabel: {
		marginBottom: 8,
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		fontFamily: fontFamily.NunitoSans.Regular,
	},
	conditionContainer: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 16,
	},
	conditionButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
	},
	selectedCondition: {
		backgroundColor: colors.primary,
	},
	conditionText: {},
	selectedConditionText: {
		color: colors["white-font"],
		fontFamily: fontFamily.NunitoSans.Regular,
	},
	textArea: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		height: 90,
		textAlignVertical: "top",
		marginBottom: 16,
		fontFamily: fontFamily.NunitoSans.Regular,
	},
	submitButton: {
		backgroundColor: colors.primary,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	submitButtonText: {
		color: colors["white-font"],
		fontFamily: fontFamily.NunitoSans.Bold,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: 300,
		padding: 20,
		backgroundColor: colors["light-bg"],
		borderRadius: 8,
	},
	modalItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors["light-gray-light-theme"],
	},
	modalItemText: {
		fontFamily: fontFamily.NunitoSans.Regular,
	},
	closeModalButton: {
		marginTop: 20,
		alignItems: "center",
		paddingVertical: 8,
		backgroundColor: colors["primary"],
		borderRadius: 8,
	},
	closeModalButtonText: {
		color: colors["white-font"],
		fontFamily: fontFamily.NunitoSans.Bold,
	},
});
