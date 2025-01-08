import React from "react";
import { AuthInterface } from "@/lib/interfaces/auth/auth.interface";
import "../../global.css";
import { resetForm } from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Headline from "./base/Headline";
import MainScreen from "./base/MainScreen";
import AuthFields from "./base/AuthFields";
import AuthActions from "./base/AuthActions";
import AuthFooter from "./base/AuthFooter";
import { validateForm } from "@/lib/utils/authValidation.utils";
import { Alert } from "react-native";

const Login = ({ onSubmit }: AuthInterface) => {
	const dispatch = useAppDispatch();
	const { email, password } = useAppSelector((state) => state.auth);

	const handleLogin = () => {
		const formState = { email, password, isLogin: true };
		const validationResult = validateForm(formState);

		if (validationResult.isValid) {
			onSubmit({ email, password });
			dispatch(resetForm());
		} else {
			Alert.alert("Failed!", validationResult.errors.join(", "));
		}
	};

	return (
		<MainScreen
			style={{
				flex: 1,
				marginTop: 40,
				flexDirection: "column",
				gap: 50,
				marginHorizontal: 10,
			}}
		>
			<Headline
				logoStyle={{
					display: "flex",
					alignItems: "center",
				}}
				headlineStyle={{
					marginLeft: 15,
					gap: 10,
				}}
				title='Login'
				description='Welcome back, login to continue!'
			/>
			<AuthFields
				containerStyle={{
					gap: 10,
				}}
				type='login'
			/>
			<AuthActions
				type='login'
				buttonContent='Login'
				onSubmit={handleLogin}
				// TODO: add google auth
				handleGoogleAuth={() => {}}
				containerStyle={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "center",
				}}
				dividerStyle={{
					marginVertical: 20,
					marginHorizontal: 50,
				}}
			/>
			<AuthFooter
				hyperLinkContent='Register'
				hintContent="Don't have an account?"
				containerStyle={{
					marginHorizontal: "auto",
					flexDirection: "row",
					alignItems: "center",
					gap: 5,
					marginBottom: 10,
				}}
			/>
		</MainScreen>
	);
};

export default Login;
