import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TierState {
	currentTier: string;
	tierRequirement: number | null;
	completedBarters: number | null;
	progress: number | 0;
}

const initialState: TierState = {
	currentTier: "Bronze",
	tierRequirement: null,
	completedBarters: null,
	progress: 40,
};

const tierSlice = createSlice({
	name: "tiers",
	initialState,
	reducers: {
		setCurrentTier(state, action: PayloadAction<string>) {
			state.currentTier = action.payload;
		},
		setTierRequirement(state, action: PayloadAction<number | null>) {
			state.tierRequirement = action.payload;
		},
		setCompletedBarters(state, action: PayloadAction<number | null>) {
			state.completedBarters = action.payload;
		},
		setProgress(state, action: PayloadAction<number | 0>) {
			state.progress = action.payload;
		},
		resetTierState(state) {
			state.currentTier = "";
			state.tierRequirement = null;
			state.completedBarters = null;
			state.progress = 0;
		},
	},
});

export const {
	setCurrentTier,
	setTierRequirement,
	setCompletedBarters,
	setProgress,
	resetTierState,
} = tierSlice.actions;

export default tierSlice.reducer;
