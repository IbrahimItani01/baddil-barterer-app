import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
	loading: boolean;
	booting: boolean;
}

const initialState: LoaderState = {
	loading: false,
	booting: true,
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
		stoppedBooting: (state) => {
			state.booting = false;
		},
		startBooting: (state) => {
			state.booting = true;
		},
	},
});

export const { showLoader, hideLoader, stoppedBooting, startBooting } =
	screenLoaderSlice.actions;
export default screenLoaderSlice.reducer;
