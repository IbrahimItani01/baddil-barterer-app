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

const Register = ({ onSubmit }: AuthInterface) => {
	const dispatch = useAppDispatch();
	const { username, email, password, confirmPassword } = useAppSelector(
		(state) => state.auth
	);

	const handleRegister = () => {
		const isFormValid = dispatch(validateForm());
		if (isFormValid) {
			onSubmit({ username, email, password, confirmPassword });
			dispatch(resetForm());
		}
	};

	return (
		<MainScreen
			style={{
				display: "flex",
				marginTop: 25,
				flexDirection: "column",
				marginHorizontal: 10,
			}}
		>
			<Headline
				headlineStyle={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					marginLeft: 10,
					marginVertical: 30,
				}}
				logoStyle={{
					alignSelf: "center",
				}}
				title='Register'
				description='Welcome to Baddil, register to start!'
			/>
			<AuthFields
				containerStyle={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
				type='register'
			/>
			<AuthActions
				type='register'
				buttonContent='Register'
				onSubmit={handleRegister}
				// TODO: add google auth
				handleGoogleAuth={() => {}}
				containerStyle={{
					display: "flex",
					flexDirection: "column",
					gap: 10,
					marginVertical: 25,
				}}
				dividerStyle={{
					marginHorizontal: 50,
				}}
			/>
			<AuthFooter
				hyperLinkContent='Login'
				hintContent='Already have an account?'
				containerStyle={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "row",
					gap: 5,
				}}
			/>
		</MainScreen>
	);
};

export default Register;
