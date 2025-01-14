import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the state
interface WalletItem {
	id: string;
	name: string;
	description: string;
	category_id: string;
	subcategory_id: string;
	condition: string; // Adjusting condition to a string to match `ItemCondition` enum
	location_id: string;
	wallet_id: string;
	value: number;
	created_at: Date;
	updated_at: Date;
}

// Define the state structure
interface WalletState {
	items: WalletItem[]; // Store all items
}

// Initial state
const initialState: WalletState = {
	items: [], // Empty items array initially
};

// Create the slice
const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<WalletItem[]>) => {
			state.items = action.payload; // Replace items with the new list
		},
		addItem: (state, action: PayloadAction<WalletItem>) => {
			state.items.push(action.payload); // Add a new item
		},
		updateItem: (state, action: PayloadAction<WalletItem>) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.items[index] = action.payload; // Update item if found
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload); // Remove item by ID
		},
	},
});

// Export actions
export const { setItems, addItem, updateItem, removeItem } =
	walletSlice.actions;

// Export the reducer
export default walletSlice.reducer;
