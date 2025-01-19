import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ButtonInterface {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: string;
  disabled?: boolean;
}
