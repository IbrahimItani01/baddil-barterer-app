import CustomText from "@/components/base/CustomText";
import CustomView from "@/components/base/CustomView";
import "../../global.css";
import CustomLink from "@/components/base/CustomLink";
export default function Tab() {
	return (
		<CustomView
			mainScreen={true}
			NativeClasses='flex justify-center items-center'
		>
			<CustomText content='home' />
			<CustomLink
				href={'/onBoarding'}
				content='onboard'
			/>
		</CustomView>
	);
}
