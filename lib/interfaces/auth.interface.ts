import { SubmitDTO } from "@/app/auth";

export interface AuthInterface {
	onPress: () => void;
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
