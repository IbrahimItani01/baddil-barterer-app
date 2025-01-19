import React from "react";
import CustomView from "@/components/base/CustomView";
import CustomAuthInput from "@/components/base/CustomAuthInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	setConfirmPassword,
	setEmail,
	setPassword,
	setUsername,
} from "@/store/slices/auth.slice";
import { StyleProp, ViewStyle } from "react-native";

interface AuthFieldsInterface {
	type: "login" | "register";
	containerStyle: StyleProp<ViewStyle>;
}

const AuthFields = (props: AuthFieldsInterface) => {
	const { username, email, password, confirmPassword } = useAppSelector(
		(state) => state.auth
	);
	const dispatch = useAppDispatch();

	return (
		<CustomView style={props.containerStyle}>
			{props.type === "register" && (
				<CustomAuthInput
					label='Name'
					placeholder='John Doe'
					type='username'
					value={username}
					onChangeText={(text) => dispatch(setUsername(text))}
				/>
			)}
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
				forRegister={props.type === "register" ? true : false}
				onChangeText={(text) => dispatch(setPassword(text))}
			/>
			{props.type === "register" && (
				<CustomAuthInput
					label='Confirm Password'
					placeholder='*******************'
					type='password'
					isPassword={true}
					value={confirmPassword}
					forRegister={true}
					onChangeText={(text) => dispatch(setConfirmPassword(text))}
				/>
			)}
		</CustomView>
	);
};

export default AuthFields;
