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

