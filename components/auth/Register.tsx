import React from "react";
import CustomText from "../base/CustomText";
import CustomView from "../base/CustomView";
import { AuthInterface } from "@/lib/interfaces/auth.interface";

const Register = (props:AuthInterface) => {
	return (
		<CustomView>
			<CustomText content='Register' />
		</CustomView>
	);
};

export default Register;
