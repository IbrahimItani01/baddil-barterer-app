import Onboarding from "react-native-onboarding-swiper";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import { colors } from "@/lib/constants/colors.constant";
import Loader from "@/components/base/Loader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import "../../global.css";
import { completeOnboarding } from "@/store/slices/user.slice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

