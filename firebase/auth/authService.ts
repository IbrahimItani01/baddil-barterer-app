import { checkUserByEmail } from "@/apis/routes/user/user.routes";
import { auth } from "@/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "react-native";

export const sendResetPasswordEmail = async (email: string): Promise<void> => {
	if (await checkUserByEmail(email)) {
		try {
			await sendPasswordResetEmail(auth, email);
			alert("Password reset email sent successfully! Check your inbox.");
		} catch (error) {
			console.error("Error sending password reset email:", error);
			alert("Failed to send password reset email. Please try again.");
		}
	} else {
		Alert.alert("You don't have an account with us. Please create one first.");
	}
};
