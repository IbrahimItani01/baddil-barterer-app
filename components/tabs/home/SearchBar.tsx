import { View } from "react-native";
import React, { useState } from "react";
import { colors } from "@/lib/constants/colors.constant";
import { Searchbar } from "react-native-paper";

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searching, setSearching] = useState(false);
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
				style={{
					backgroundColor: "transparent",
					borderColor: colors["light-gray-light-theme"],
					borderWidth: 0.5,
				}}
			/>
		</View>
	);
};

export default SearchBar;
