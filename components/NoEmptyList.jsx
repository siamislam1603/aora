import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const NoEmptyList = ({ title, subtitle, buttonText, buttonHref }) => {
  return (
    <View className="flex-col items-center">
      <Image source={images.empty} resizeMode="contain" className="h-60" />
      <Text className="text-gray-100 text-sm font-pregular">{title}</Text>
      <Text className="text-white text-xl font-psemibold">{subtitle}</Text>
      <CustomButton
        title={buttonText}
        buttonStyle="w-full"
        handlePress={() => router.push(buttonHref)}
      />
    </View>
  );
};

export default NoEmptyList;
