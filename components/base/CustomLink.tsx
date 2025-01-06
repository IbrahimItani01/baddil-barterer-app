import { Link, router } from "expo-router";
import { CustomLinkInterface } from "@/lib/interfaces/CustomLink.interface";

const CustomLink = (prop: CustomLinkInterface) => {
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
      href={linkHref || "/"} // Provide a default valid href
      onPress={prop.href === "back" ? handlePress : undefined}
      className={prop.NativeClasses}
    >
      {prop.content}
    </Link>
  );
};

export default CustomLink;
