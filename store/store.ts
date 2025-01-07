import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import authReducer from "./slices/auth.slice";

const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
