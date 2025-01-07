import { SubmitDTO } from "@/app/auth";

export interface AuthInterface {
	onPress: () => void;
	onSubmit: (params: SubmitDTO) => void;
}
