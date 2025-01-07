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
		<MainScreen>
			<Headline
				title='Login'
				description='Welcome back, login to continue!'
			/>
			<AuthFields type='login' />
			<AuthActions
				type='login'
				buttonContent='Login'
				onSubmit={handleLogin}
				// TODO: add google auth
				handleGoogleAuth={() => {}}
			/>
			<AuthFooter
				hyperLinkContent='Register'
				hintContent="Don't have an account?"
			/>
		</MainScreen>
	);
};

export default Login;
