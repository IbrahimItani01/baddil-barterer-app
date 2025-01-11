import React from "react";
import { AuthInterface } from "@/lib/interfaces/auth/auth.interface";
import { resetForm } from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Headline from "./base/Headline";
import MainScreen from "./base/MainScreen";
import AuthFields from "./base/AuthFields";
import AuthActions from "./base/AuthActions";
import AuthFooter from "./base/AuthFooter";
import { Alert, StyleSheet } from "react-native";
import { validateForm } from "@/lib/utils/authValidation.utils";

const Register = ({ onSubmit }: AuthInterface) => {
	const dispatch = useAppDispatch();
	const { username, email, password, confirmPassword } = useAppSelector(
		(state) => state.auth
	);

	const handleRegister = () => {
		const formState = {
			username,
			email,
			password,
			confirmPassword,
			isLogin: false,
		};
		const validationResult = validateForm(formState);

		if (validationResult.isValid) {
			onSubmit({ username, email, password });
			dispatch(resetForm());
		} else {
			Alert.alert(
				"Failed!",
				`Please check: ${validationResult.errors.join(", ")}`
			);
		}
	};

	return (
		<MainScreen style={styles.mainScreen}>
			<Headline
				headlineStyle={styles.headlineText}
				logoStyle={styles.headlineLogo}
				title='Register'
				description='Welcome to Baddil, register to start!'
			/>
			<AuthFields
				containerStyle={styles.authFields}
				type='register'
			/>
			<AuthActions
				type='register'
				buttonContent='Register'
				onSubmit={handleRegister}
				handleGoogleAuth={() => {}}
				containerStyle={styles.authActions}
				dividerStyle={styles.dividerStyle}
			/>
			<AuthFooter
				hyperLinkContent='Login'
				hintContent='Already have an account?'
				containerStyle={styles.authFooter}
			/>
		</MainScreen>
	);
};

const styles = StyleSheet.create({
	mainScreen: {
		display: "flex",
		marginTop: 25,
		flexDirection: "column",
		marginHorizontal: 10,
	},
	headlineLogo: {
		alignSelf: "center",
	},
	headlineText: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
		marginLeft: 10,
		marginVertical: 30,
	},
	authFields: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
	},
	authActions: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		marginVertical: 25,
	},
	dividerStyle: {
		marginHorizontal: 50,
	},
	authFooter: {
		alignSelf: "center",
		display: "flex",
		flexDirection: "row",
		gap: 5,
	},
});

export default Register;
