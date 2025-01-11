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
};

export default SearchBar;
