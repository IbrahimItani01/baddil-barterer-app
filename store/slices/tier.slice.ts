import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TierState {
	currentTier: string;
	tierRequirement: number | null;
	completedBarters: number | null;
	progress: number | 0;
}

