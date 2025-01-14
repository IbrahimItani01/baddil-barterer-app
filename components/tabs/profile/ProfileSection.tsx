import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"; // Import StyleSheet for styling
import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons for fallback face icon
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { colors } from "@/lib/constants/colors.constant";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { setUserName } from "@/store/slices/user.slice";
import CustomAlert from "./base/CustomAlert";
import { withLoader } from "@/lib/utils/async.utils";
import { sendForgetPasswordEmail } from "@/apis/routes/auth/auth.routes";

const iconMap: {
	[key in
		| "Profile Picture"
		| "Username"
		| "Password"
		| "Account"]: keyof typeof MaterialIcons.glyphMap;
} = {
	"Profile Picture": "photo",
	Username: "account-circle",
	Password: "lock",
	Account: "person",
};
