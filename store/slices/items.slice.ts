import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
	id: string;
	name: string;
	description: string;
	category_id: string;
	subcategory_id: string;
	condition: string;
	location_id: string;
	wallet_id: string;
	value: number;
	created_at: Date;
	updated_at: Date;
	wallet: {
		id: string;
		created_at: Date;
		updated_at: Date;
		owner_id: string;
		owner: {
			email: string;
		};
	};
}

interface ItemsState {
	items: Item[];
}

const initialState: ItemsState = {
	items: [],
};

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Item[]>) => {
			state.items = action.payload;
		},
		addItem: (state, action: PayloadAction<Item>) => {
			state.items.push(action.payload);
		},
		updateItem: (state, action: PayloadAction<Item>) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		resetItems: () => initialState,
	},
});

export const { setItems, addItem, updateItem, removeItem, resetItems } =
	itemsSlice.actions;
export default itemsSlice.reducer;
