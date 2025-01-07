import React, { useState } from "react";
import "../../global.css";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export interface SubmitDTO {
	username?: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

const Index = () => {
	const [isLogin, setIsLogin] = useState(true);
	
