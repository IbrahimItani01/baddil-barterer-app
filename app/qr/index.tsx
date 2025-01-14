import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import LogoDark from "../../assets/images/icon-dark.png";
import LogoLight from "../../assets/images/icon.png";
import { useAppSelector } from "@/store/hooks";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { checkUserByEmail } from "@/apis/routes/user/user.routes";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import { formatDate } from "@/lib/utils/general.utils";

const index = () => {
	const { email } = useLocalSearchParams();
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		createdAt: "",
		userStatus: "",
	});

	useEffect(() => {
		const getUserData = async () => {
			const normalizedEmail = Array.isArray(email) ? email[0] : email; // Handle both string and string[]
			if (normalizedEmail) {
				try {
					const response = await checkUserByEmail(normalizedEmail);
                    console.log(response.data)
					if (response?.data) {
						setUserData({
							name: response.data.name || "",
							email: response.data.email || "",
							createdAt: formatDate(response.data.created_at) || "",
							userStatus: response.data.user_status_id || "",
						});
					}
				} catch (error) {
					console.error("Failed to fetch user data:", error);
				}
			}
		};

		getUserData();
	}, [email]);
	const theme = useAppSelector((state) => state.system.colorScheme);

