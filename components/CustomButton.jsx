import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, buttonStyle, textStyle, handlePress }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-100 min-h-[58px] items-center justify-center rounded-lg mt-8 ${buttonStyle}`}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
