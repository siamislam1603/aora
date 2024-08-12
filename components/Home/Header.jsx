import React from "react";
import { Image, Text, View } from "react-native";
import { icons, images } from "../../constants";
import CustomTextInput from "../form-inputs/CustomTextInput";
import Slider from "./Slider";

const Header = ({ videos }) => {
  return (
    <View>
      <View className="space-y-5 p-4 pb-0">
        <View className="flex-row justify-between space-x-2 items-center">
          <View>
            <Text className="text-gray-100 font-pregular">Welcome Back</Text>
            <Text className="text-white text-2xl font-psemibold">
              jsmastery
            </Text>
          </View>
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-8 h-8"
          />
        </View>
        <View>
          <CustomTextInput
            placeholder="Search for a video topic"
            endIcon={icons.search}
            onIconPress={() => console.log("pressed")}
          />
        </View>
      </View>
      <Slider videos={videos} />
    </View>
  );
};

export default Header;
