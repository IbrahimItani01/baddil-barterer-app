import dayjs from "dayjs";

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatDate = (date: string) => {
	return dayjs(date).format("MMMM D, YYYY");
};
