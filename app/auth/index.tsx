import React from "react";
import "../../global.css";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { SubmitDTO } from "@/lib/interfaces/auth/auth.interface";
import { useAppSelector } from "@/store/hooks";
import { loginUser, registerUser } from "@/apis/routes/auth/auth.routes";
import { withLoader } from "@/lib/utils/async.utils";
import { useDispatch } from "react-redux";
import { setIsLogin } from "@/store/slices/auth.slice";

const Index = () => {
	const isLogin = useAppSelector((state) => state.auth.isLogin);
	const dispatch = useDispatch();

	const handleSubmit = async (params: SubmitDTO) => {
		if (isLogin) {
			// Call API for login
			withLoader(dispatch, () =>
				loginUser(dispatch, params.email, params.password)
			);
		} else {
			// Call API for register
			withLoader(dispatch, () =>
				registerUser(params.username, params.email, params.password)
			).then((_) => dispatch(setIsLogin(!isLogin)));
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
