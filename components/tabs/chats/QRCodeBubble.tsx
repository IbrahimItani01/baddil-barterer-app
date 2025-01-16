import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import CustomText from "@/components/base/CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { Camera, CameraView } from "expo-camera";
import Button from "@/components/base/Button";
import { Linking } from "react-native"; // Import for opening links
import { getBaseAppUrl } from "@/lib/constants/connection.constant";
import { currentIp } from "@/apis/main";

const QRCodeBubble = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [isQrVisible, setQrVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);
	const [isScannerVisible, setScannerVisible] = useState(false);
	const email = useAppSelector((state) => state.user.email);
	const [baseUrl, setBaseUrl] = useState(`http://${currentIp}:5173`);

	useEffect(() => {
		// const fetchBaseUrl = async () => {
		//     const url = await getBaseAppUrl();
		//     setBaseUrl(url);
		// };
		// fetchBaseUrl();

		const getPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		};
		getPermissions();
	}, []);
	const uniqueId = `${baseUrl}/meetup-verify/${encodeURIComponent(email)}`;

	const handleQrDisplay = () => {
		setQrVisible(true);
	};

	const handleCloseQr = () => {
		setQrVisible(false);
	};

	const handleQrScan = () => {
		setScanned(false);
		setScannerVisible(true);
	};

	const handleCloseScanner = () => {
		setScannerVisible(false);
	};

	return (
		<View
			style={{
				position: "absolute",
				bottom: 40,
				left: 20,
				flexDirection: "column",
				gap: 30,
				padding: 20,
				borderWidth: 1,
				borderRadius: 12,
				borderColor:
					theme === "dark"
						? colors["dark-gray-dark-theme"]
						: colors["light-gray-light-theme"],
			}}
		>
			<TouchableOpacity
				onPress={handleQrDisplay}
				style={styles.container}
			>
				<MaterialIcons
					name='qr-code'
					size={35}
					color={theme === "dark" ? colors["light-bg"] : colors["dark-bg"]}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={handleQrScan}
				style={styles.container}
			>
				<MaterialIcons
					name='qr-code-scanner'
					size={35}
					color={theme === "dark" ? colors["light-bg"] : colors["dark-bg"]}
				/>
			</TouchableOpacity>

			<Modal
				visible={isQrVisible}
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<QRCode
						value={uniqueId}
						size={250}
					/>
					<Button
						title='close'
						style={{
							width: 200,
							marginTop: 40,
						}}
						onPress={handleCloseQr}
					/>
				</View>
			</Modal>

			{isScannerVisible && (
				<Modal
					visible={isScannerVisible}
					transparent={true}
				>
					<View style={styles.modalContainer}>
						{hasPermission === null ? (
							<Text>Requesting camera permission...</Text>
						) : hasPermission === false ? (
							<Text>No access to camera</Text>
						) : (
							<View
								style={{
									borderRadius: 12,
								}}
							>
								<CameraView
									style={{
										width: 300,
										height: 300,
									}}
									onBarcodeScanned={({ data }) => {
										if (!scanned) {
											setScanned(true); // Set scanned to true immediately
											setScannerVisible(false); // Hide scanner
											Linking.openURL(data) // Open the link from QR code
												.catch(() => {
													alert("Invalid URL or failed to open link."); // Handle error
												});
										}
									}}
									facing='back'
								/>
							</View>
						)}
						<Button
							title='close'
							style={{
								width: 200,
								marginTop: 20,
							}}
							onPress={handleCloseScanner}
						/>
					</View>
				</Modal>
			)}
		</View>
	);
};

export default QRCodeBubble;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	text: {
		fontFamily: fontFamily.NunitoSans.SemiBold,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	closeButton: {},
});
