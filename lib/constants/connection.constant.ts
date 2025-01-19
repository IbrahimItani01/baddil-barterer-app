import * as Network from "expo-network";

export const getBaseAppUrl = async () => {
	const ipAddress = await Network.getIpAddressAsync();
	return `http://${ipAddress}:8081`;
};
