import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import authReducer from "./slices/auth.slice";
import screenLoaderSlice from "./slices/screenLoader.slice";

const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		screenLoader: screenLoaderSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
