import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons"; 

import { ButtonInterface } from "@/lib/interfaces/Button.interface";
import "../../global.css";

const Button = (prop: ButtonInterface) => {
  return (
    <TouchableOpacity
      onPress={prop.onPress}
      style={{
        paddingVertical: 20,
        marginHorizontal: 10,
        opacity: prop.disabled ? 0.5 : 1, 
      }}
      className={`rounded-full ${
        prop.type === "outline" ? "border-2 border-primary" : "bg-primary"
      } ${prop.style}`}
      disabled={prop.disabled}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {prop.disabled ? (
          <MaterialIcons
            name="lock"
            size={20}
            color={prop.type === "outline" ? "gray" : "white"} // Change color based on button type
          />
        ) : (
          <Text
            className={`uppercase text-center font-nunito-semibold font-semibold ${
              prop.type === "outline" ? "text-primary" : "text-white-font"
            } ${prop.textStyle}`}
          >
            {prop.title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
