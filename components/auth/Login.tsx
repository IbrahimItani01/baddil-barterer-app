import React from "react";
import { AuthInterface } from "@/lib/interfaces/auth/auth.interface";
import "../../global.css";
import { validateForm, resetForm } from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Headline from "./base/Headline";
import MainScreen from "./base/MainScreen";
import AuthFields from "./base/AuthFields";
import AuthActions from "./base/AuthActions";
import AuthFooter from "./base/AuthFooter";

const Login = ({ onSubmit }: AuthInterface) => {
	const dispatch = useAppDispatch();
	const { email, password } = useAppSelector((state) => state.auth);

	const handleLogin = () => {
		const isFormValid = dispatch(validateForm());
		if (isFormValid) {
			onSubmit({ email, password });
			dispatch(resetForm());
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
