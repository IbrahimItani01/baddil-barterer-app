import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "@/lib/constants/colors.constant";
import { Searchbar } from "react-native-paper";
import { useAppSelector } from "@/store/hooks";
import { fontFamily } from "@/lib/constants/fonts.constant";

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searching, setSearching] = useState(false);
	const theme = useAppSelector((state) => state.system.colorScheme);

	const handleChange = (newValue: string) => setSearchValue(newValue);
	const handleClear = () => {
		setSearchValue("");
		setSearching(false);
	};

	const handleSearch = () => {
		setSearching(true);
		setTimeout(() => {
			setSearching(false);
			setSearchValue("");
		}, 2000);
	};

	return (
		<View>
			<Searchbar
				placeholder='Search'
				value={searchValue}
				selectionColor={colors.primary}
				loading={searching}
				onClearIconPress={handleClear}
				onChangeText={handleChange}
				onSubmitEditing={handleSearch}
				style={[
					styles.searchbar,
					{
						borderColor:
							theme === "dark"
								? colors["dark-gray-dark-theme"]
								: colors["light-gray-light-theme"],
					},
				]}
				placeholderTextColor={
					theme === "dark"
						? colors["dark-gray-dark-theme"]
						: colors["light-gray-light-theme"]
				}
				inputStyle={{
					color: theme === "dark" ? "white" : "black",
					fontFamily: `${fontFamily.NunitoSans.Regular}`
				}}
				
			/>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	searchbar: {
		backgroundColor: "transparent",
		borderWidth: 0.5,
	},
});
