import { hideLoader, showLoader } from "@/store/slices/screenLoader.slice";
import { AppDispatch } from "@/store/store";
import { Alert } from "react-native";

export const withLoader = async (
	dispatch: AppDispatch,
	asyncFunction: () => Promise<any>
) => {
	dispatch(showLoader());
	try {
		const result = await asyncFunction();
		return result;
	} finally {
		dispatch(hideLoader());
	}
};

export const showAlert = (title: string, message: string): Promise<void> => {
	return new Promise((resolve) => {
		Alert.alert(title, message, [{ text: "OK", onPress: () => resolve() }]);
	});
};
