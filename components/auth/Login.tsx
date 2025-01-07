import React, { useState } from "react";
import CustomView from "../base/CustomView";
import { AuthInterface } from "@/lib/interfaces/auth.interface";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/base/logo.svg";
import "../../global.css";
import CustomText from "../base/CustomText";
import CustomAuthInput from "../base/CustomAuthInput";
import Button from "../base/Button";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Divider } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import {
	isValidEmail,
	isValidPassword,
} from "@/lib/utils/authValidation.utils";
import Loader from "../base/Loader";

const Login = ({ onPress, onSubmit }: AuthInterface) => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const theme = useColorScheme();
	
	const handleLogin = () => {
		let hasError = false;

		// Validate email
		if (!isValidEmail(email)) {
			setEmailError("Invalid email format!");
			hasError = true;
		} else {
			setEmailError("");
		}

		// Validate password
		if (!isValidPassword(password)) {
			setPasswordError("Incorrect password");
			hasError = true;
		} else {
			setPasswordError("");
		}

		// If no errors, call onSubmit
		if (!hasError) {
			onSubmit({ email, password });
			setEmailError("");
			setPasswordError("");
		}
	};

