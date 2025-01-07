export interface ButtonInterface {
	title: string;
	onPress?: () => void;
	style?: string;
	textStyle?: string;
	type?: string;
	disabled?: boolean;
}
