import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
	loading: boolean;
}

const initialState: LoaderState = {
	loading: false,
};

const screenLoaderSlice = createSlice({
	name: "screenLoader",
	initialState,
	reducers: {
		showLoader: (state) => {
			state.loading = true;
		},
		hideLoader: (state) => {
			state.loading = false;
		},
	},
});

export const { showLoader, hideLoader } = screenLoaderSlice.actions;
export default screenLoaderSlice.reducer;
