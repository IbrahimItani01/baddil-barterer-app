import React from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import CustomText from "@/components/base/CustomText";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setItemField } from "@/store/slices/items.slice";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";

const ItemInputs = () => {
	const dispatch = useAppDispatch();
	const { title, location, condition, description } = useAppSelector(
		(state) => state.item
	);
	const theme = useAppSelector((state) => state.system.colorScheme);

	return (
		<>
			<CustomText
				content='Title'
				style={styles.inputLabel}
			/>
			<TextInput
				style={[
					styles.input,
					{
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					},
				]}
				placeholder='Enter item title'
				value={title}
				onChangeText={(value) =>
					dispatch(setItemField({ field: "title", value }))
				}
			/>

			<CustomText
				content='Location'
				style={styles.inputLabel}
			/>
			<TextInput
				style={[
					styles.input,
					{
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					},
				]}
				placeholder='Enter location'
				value={location}
				onChangeText={(value) =>
					dispatch(setItemField({ field: "location", value }))
				}
			/>

			<CustomText
				content='Condition'
				style={styles.inputLabel}
			/>
			<View style={styles.conditionContainer}>
				{["New", "Used", "Refurbished"].map((option) => (
					<TouchableOpacity
						key={option}
						onPress={() =>
							dispatch(
								setItemField({
									field: "condition",
									value: condition === option ? "" : option, // Toggle between selected and unselected
								})
							)
						}
						style={[
							styles.conditionButton,
							condition === option && styles.selectedCondition,
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
								condition === option
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
			<TextInput
				style={[
					styles.textArea,
					{
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					},
				]}
				placeholder='Describe the item you are bartering...'
				value={description}
				onChangeText={(value) =>
					dispatch(setItemField({ field: "description", value }))
				}
				multiline
			/>
		</>
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
	},
	textArea: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		height: 90,
		textAlignVertical: "top",
		marginBottom: 16,
	},
});
