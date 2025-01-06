import { ReactNode } from "react";

export interface CustomViewInterface {
    NativeClasses?: string;
    children?: ReactNode;
    mainScreen?:boolean
}