import React from "react";
import "../../global.css";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { SubmitDTO } from "@/lib/interfaces/auth/auth.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Index = () => {
	const isLogin = useAppSelector((state) => state.auth.isLogin);

	

	const handleSubmit = async (params: SubmitDTO) => {
		// Handle calling API depending on isLogin state
	};

	return (
		<>
			{isLogin ? (
				<Login
					onSubmit={handleSubmit}
				/>
			) : (
				<Register
					onSubmit={handleSubmit}
				/>
			)}
		</>
	);
};

export default Index;
