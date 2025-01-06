import { ExternalPathString, RelativePathString } from "expo-router";

export interface CustomLinkInterface {
	behavior?: 'replace' | 'push';
	NativeClasses: string;
	content: string;
	href: RelativePathString|ExternalPathString|any;
}
