import { hideLoader, showLoader } from "@/store/slices/screenLoader.slice";
import { AppDispatch } from "@/store/store";

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
