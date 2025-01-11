import { Link, router } from "expo-router";
import { CustomLinkInterface } from "@/lib/interfaces/CustomLink.interface";
import { colors } from "@/lib/constants/colors.constant";
import "../../global.css"
import { useAppSelector } from "@/store/hooks";
const CustomLink = (prop: CustomLinkInterface) => {
  const theme = useAppSelector((state) => state.system.colorScheme);
  const handlePress = () => {
    if (prop.href === "back") {
      if (prop.behavior === "replace") {
        router.replace("/");
      } else {
        router.back();
      }
    }
  };

  const linkHref = prop.href === "back" ? undefined : prop.href;

  return (
    <Link
      href={linkHref || "/"} 
      onPress={prop.href === "back" ? handlePress : undefined}
      className={prop.NativeClasses}
      style={{
        color: theme==='dark'?`${colors["white-font"]}`: `${colors["black-font"]}`
      }}
    >
      {prop.content}
    </Link>
  );
};

export default CustomLink;
