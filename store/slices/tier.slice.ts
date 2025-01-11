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

