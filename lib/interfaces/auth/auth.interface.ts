export interface AuthInterface {
	onSubmit: (params: SubmitDTO) => void;
}
export interface AuthInputInterface {
	placeholder: string;
	isPassword?: boolean;
	type?: "email" | "password" | "username";
	NativeClasses?: string;
	errorMessage?: string;
	label: string;
	onChangeText?: (text: string) => void;
	value?: string;
}
export interface SubmitDTO {
	username?: string;
	email: string;
	password: string;
	confirmPassword?: string;
}
