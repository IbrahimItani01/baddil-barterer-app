import React from "react";
import { Input } from "@rneui/themed";
import { AuthInputInterface } from "@/lib/interfaces/auth.interface";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

const CustomAuthInput = (props: AuthInputInterface) => {
	const theme = useColorScheme();
	const handleForgotPassword = () => {
		// handle forgot password
	};

