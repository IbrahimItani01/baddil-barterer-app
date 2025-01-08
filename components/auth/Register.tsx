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
		<CustomView>
			<CustomText content='Register' />
		</CustomView>
	);
};

export default Register;
