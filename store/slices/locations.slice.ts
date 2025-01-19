import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Location {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  longitude: number;
  latitude: number;
}

interface LocationsState {
  locations: Location[]; 
}


const initialState: LocationsState = {
  locations: [],
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload; 
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload); 
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(loc => loc.id === action.payload.id);
      if (index !== -1) {
        state.locations[index] = action.payload; 
      }
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(loc => loc.id !== action.payload); 
    },
    resetLocations: () => initialState, 
  },
});

export const { setLocations, addLocation, updateLocation, removeLocation, resetLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
