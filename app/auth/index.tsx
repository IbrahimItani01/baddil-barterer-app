import React from "react";
import "../../global.css";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { SubmitDTO } from "@/lib/interfaces/auth/auth.interface";
import { useAppSelector } from "@/store/hooks";
import { loginUser, registerUser } from "@/apis/routes/auth/auth.routes";
import { Alert } from "react-native";

const Index = () => {
	const isLogin = useAppSelector((state) => state.auth.isLogin);

	const handleSubmit = async (params: SubmitDTO) => {
		if (isLogin) {
			// Call API for login
			try {
				await loginUser(params.email, params.password);
			} catch (error) {
				Alert.alert("Error", "failed to login");
			}
		} else {
			// Call API for register
			try {
				await registerUser(params.username, params.email, params.password);
			} catch (error) {
				Alert.alert("Error", "failed to register");
			}
		}
	};

	return (
		<>
			{isLogin ? (
				<Login onSubmit={handleSubmit} />
			) : (
				<Register onSubmit={handleSubmit} />
			)}
		</>
	);
};

export default Index;
