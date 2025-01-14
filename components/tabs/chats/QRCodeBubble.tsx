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

const QRCodeBubble = () => {
	const theme = useAppSelector((state) => state.system.colorScheme);
	const [isQrVisible, setQrVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState(false);
	const [isScannerVisible, setScannerVisible] = useState(false);
	const email = useAppSelector((state) => state.user.email);
	const [baseUrl, setBaseUrl] = useState("http://200.200.200.105:8081");

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
	const uniqueId = `${baseUrl}/qr?email=${encodeURIComponent(email)}`;

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

