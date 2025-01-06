import { RootState } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setOnboarding } from "@/store/slices/user.slice";

