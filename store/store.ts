import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import authSlice from "./slices/auth.slice";
import screenLoaderSlice from "./slices/screenLoader.slice";
import tierSlice from "./slices/tier.slice";
import systemSlice from "./slices/system.slice";

const store = configureStore({
	reducer: {
		user: userSlice,
		auth: authSlice,
		screenLoader: screenLoaderSlice,
		tiers: tierSlice,
		system: systemSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
