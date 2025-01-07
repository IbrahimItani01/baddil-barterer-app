import React from "react";
import CustomView from "../base/CustomView";
import { AuthInterface } from "@/lib/interfaces/auth.interface";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/base/logo.svg";
import "../../global.css";
import CustomText from "../base/CustomText";
import CustomAuthInput from "../base/CustomAuthInput";
import Button from "../base/Button";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Divider } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "../base/Loader";
import {
	setEmail,
	setPassword,
	validateForm,
	resetForm,
} from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Login = ({ onPress, onSubmit }: AuthInterface) => {
	const dispatch = useAppDispatch();
	const { email, password, emailError, passwordError } = useAppSelector(
		(state) => state.auth
	);

	const theme = useColorScheme();

	const handleLogin = () => {
		const isFormValid = dispatch(validateForm());
		if (isFormValid) {
			onSubmit({ email, password });
			dispatch(resetForm());
		}
	};

	return (
		<CustomView mainScreen>
			<SafeAreaView
				style={{
					flex: 1,
					marginTop: 40,
					flexDirection: "column",
					gap: 50,
				}}
			>
				<CustomView NativeClasses='flex items-center'>
					<Logo />
				</CustomView>
				<CustomView NativeClasses='gap-10'>
					<CustomView NativeClasses='ml-5 gap-2'>
						<CustomText
							content='Login'
							NativeClasses='font-raleway-bold font-bold text-5xl'
						/>
						<CustomText
							NativeClasses='font-nunito-semibold font-semibold'
							content='Welcome back, login to continue!'
						/>
					</CustomView>
					<CustomView NativeClasses='flex flex-col gap-2'>
						<CustomAuthInput
							label='Email'
							placeholder='john@example.com'
							type='email'
							value={email}
							onChangeText={(text) => dispatch(setEmail(text))}
							errorMessage={emailError}
						/>
						<CustomAuthInput
							label='Password'
							placeholder='*******************'
							type='password'
							isPassword={true}
							value={password}
							onChangeText={(text) => dispatch(setPassword(text))}
							errorMessage={passwordError}
						/>
					</CustomView>
				</CustomView>
				<CustomView NativeClasses='flex-1 flex-col justify-center'>
					<Button
						title='Login'
						onPress={handleLogin}
					/>
					<Divider
						style={{
							marginVertical: 20,
							marginHorizontal: 50,
						}}
						insetType='left'
						width={1}
					/>
					<TouchableOpacity>
						<View
							style={{
								borderColor: `${colors.primary}`,
								borderWidth: 2,
								padding: 10,
								borderRadius: 50,
								alignSelf: "center",
							}}
						>
							<FontAwesome5
								name='google'
								size={30}
								color={colors.primary}
							/>
						</View>
					</TouchableOpacity>
				</CustomView>
				<View
					style={{
						marginHorizontal: "auto",
						flexDirection: "row",
						alignItems: "center",
						gap: 5,
					}}
				>
					<Loader>
						<Text
							style={{
								color:
									theme === "dark"
										? `${colors["white-font"]}`
										: `${colors["black-font"]}`,
								fontFamily: "NunitoSans-Light",
							}}
						>
							Don't have an account?
						</Text>
						<TouchableOpacity onPress={onPress}>
							<Text
								style={{
									textDecorationLine: "underline",
								}}
								className='text-primary font-nunito-semibold font-semibold'
							>
								Register
							</Text>
						</TouchableOpacity>
					</Loader>
				</View>
			</SafeAreaView>
		</CustomView>
	);
};

export default Login;
