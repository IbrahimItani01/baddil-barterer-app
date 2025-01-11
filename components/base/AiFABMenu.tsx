import { colors } from "@/lib/constants/colors.constant";
import CustomText from "./CustomText";
import { fontFamily } from "@/lib/constants/fonts.constant";
import CustomView from "./CustomView";
import { useAppSelector } from "@/store/hooks";

interface AiFABMenuIInterface {
	inHome?: boolean;
}

const AiFABMenu = ({ inHome = true }: AiFABMenuIInterface) => {
