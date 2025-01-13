import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
	title: string;
	location: string;
	condition: string;
	description: string;
	images: string[];
}

const initialState: ItemState = {
	title: "",
	location: "",
	condition: "",
	description: "",
	images: [],
};

const itemsSlice = createSlice({
	name: "item",
	initialState,
	reducers: {
		setItemField: (
			state,
			action: PayloadAction<{
				field: Exclude<keyof ItemState, "images">;
				value: string;
			}>
		) => {
			state[action.payload.field] = action.payload.value;
		},

		addImage: (state, action: PayloadAction<string>) => {
			if (state.images.length < 5) {
				state.images.push(action.payload);
			}
		},
		removeImage: (state, action: PayloadAction<string>) => {
			state.images = state.images.filter((image) => image !== action.payload);
		},
		resetItemForm: () => initialState,
	},
});

export const { setItemField, addImage, removeImage, resetItemForm } =
	itemsSlice.actions;
export default itemsSlice.reducer;
