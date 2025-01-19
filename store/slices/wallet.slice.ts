import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletItem {
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
}

interface WalletState {
	items: WalletItem[];
}

const initialState: WalletState = {
	items: [],
};

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<WalletItem[]>) => {
			state.items = action.payload;
		},
		addItem: (state, action: PayloadAction<WalletItem>) => {
			state.items.push(action.payload);
		},
		updateItem: (state, action: PayloadAction<WalletItem>) => {
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
	},
});

export const { setItems, addItem, updateItem, removeItem } =
	walletSlice.actions;

export default walletSlice.reducer;
