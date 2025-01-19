import dayjs from "dayjs";

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatDate = (date: string) => {
	return dayjs(date).format("MMMM D, YYYY");
};
export const replaceLocalhost = (url: string, newAddress: string): string => {
	return url.replace(/^http:\/\/localhost/, `http://${newAddress}`);
};
