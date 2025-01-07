import React, { useState } from "react";
import "../../global.css";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { SubmitDTO } from "@/lib/interfaces/auth.interface";

const Index = () => {
	const [isLogin, setIsLogin] = useState(true);
	const changeFrom = () => {
		setIsLogin(!isLogin);
	};
	const handleSubmit = async (params: SubmitDTO) => {
		// TODO: handle calling api depending on isLogin state
	};

	return (
		<>
			{isLogin ? (
				<Login
					onPress={changeFrom}
					onSubmit={handleSubmit}
				/>
			) : (
				<Register
					onPress={changeFrom}
					onSubmit={handleSubmit}
				/>
			)}
		</>
	);
};

export default Index;
