import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface CustomViewInterface {
    NativeClasses?: string;
    children?: ReactNode;
    mainScreen?: boolean;
    style?: StyleProp<ViewStyle>; 
}
