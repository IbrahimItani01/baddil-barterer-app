import CustomText from "@/components/base/CustomText";
import TabScreen from "@/components/tabs/base/TabScreen";
import { categories } from "@/lib/constants/categories.constant";
import CategoryCard from "@/components/tabs/baddil/CategoryCard";
import { FlatList } from "react-native";
import { fontFamily } from "@/lib/constants/fonts.constant";
import { useRouter } from "expo-router";

export default function Tab() {
