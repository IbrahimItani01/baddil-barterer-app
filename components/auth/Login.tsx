import React from "react";
import { AuthInterface } from "@/lib/interfaces/auth/auth.interface";
import { resetForm } from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Headline from "./base/Headline";
import MainScreen from "./base/MainScreen";
import AuthFields from "./base/AuthFields";
import AuthActions from "./base/AuthActions";
import AuthFooter from "./base/AuthFooter";
import { validateForm } from "@/lib/utils/authValidation.utils";
import { Alert, StyleSheet } from "react-native";

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
		<MainScreen style={styles.mainScreen}>
			<Headline
				logoStyle={styles.headlineLogo}
				headlineStyle={styles.headlineText}
				title='Login'
				description='Welcome back, login to continue!'
			/>
			<AuthFields
				containerStyle={styles.authFields}
				type='login'
			/>
			<AuthActions
				type='login'
				buttonContent='Login'
				onSubmit={handleLogin}
				handleGoogleAuth={() => {}}
				containerStyle={styles.authActions}
				dividerStyle={styles.dividerStyle}
			/>
			<AuthFooter
				hyperLinkContent='Register'
				hintContent="Don't have an account?"
				containerStyle={styles.authFooter}
			/>
		</MainScreen>
	);
};

export default Login;

const styles = StyleSheet.create({
	mainScreen: {
		flex: 1,
		marginTop: 40,
		flexDirection: "column",
		gap: 50,
		marginHorizontal: 10,
	},
	headlineLogo: {
		display: "flex",
		alignItems: "center",
	},
	headlineText: {
		marginLeft: 15,
		gap: 10,
	},
	authFields: {
		gap: 10,
	},
	authActions: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	dividerStyle: {
		marginVertical: 20,
		marginHorizontal: 50,
	},
	authFooter: {
		marginHorizontal: "auto",
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginBottom: 10,
	},
});
