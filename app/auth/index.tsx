import React, { useEffect } from "react";
import "../../global.css";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { SubmitDTO } from "@/lib/interfaces/auth.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsLogin } from "@/store/slices/auth.slice";

const Index = () => {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector((state) => state.auth.isLogin);

	const changeForm = () => {
		dispatch(setIsLogin(!isLogin));
	};

	const handleSubmit = async (params: SubmitDTO) => {
		// Handle calling API depending on isLogin state
	};

	return (
		<>
			{isLogin ? (
				<Login
					onPress={changeForm}
					onSubmit={handleSubmit}
				/>
			) : (
				<Register
					onPress={changeForm}
					onSubmit={handleSubmit}
				/>
			)}
		</>
	);
};

export default Index;
