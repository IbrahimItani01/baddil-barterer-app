import React from "react";
import CustomView from "@/components/base/CustomView";
import CustomAuthInput from "@/components/base/CustomAuthInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setEmail, setPassword } from "@/store/slices/auth.slice";

interface AuthFieldsInterface {
	type: "login" | "register";
}

const AuthFields = (props: AuthFieldsInterface) => {
	const { email, password } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	return (
		<CustomView
			style={{
				gap: 10,
			}}
		>
			<CustomView
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				{props.type === "register" && <>{/* HANDLE THE USERNAME INPUT */}</>}
				<CustomAuthInput
					label='Email'
					placeholder='john@example.com'
					type='email'
					value={email}
					onChangeText={(text) => dispatch(setEmail(text))}
				/>

				<CustomAuthInput
					label='Password'
					placeholder='*******************'
					type='password'
					isPassword={true}
					value={password}
					onChangeText={(text) => dispatch(setPassword(text))}
				/>
				{props.type === "register" && (
					<>{/* HANDLE THE CONFIRM PASSWORD INPUT */}</>
				)}
			</CustomView>
		</CustomView>
	);
};

export default AuthFields;
