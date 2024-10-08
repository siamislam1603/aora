import React from "react";
import { Image, Text, View } from "react-native";
import { images } from "../../constants";
import { useAuth } from "../../contexts/GlobalContextProvider";

const HomeHeader = () => {
  const {
    user: { username },
  } = useAuth();
  return (
    <View className="flex-row justify-between space-x-2 items-center">
      <View>
        <Text className="text-gray-100 font-pregular">Welcome Back</Text>
        <Text className="text-white text-2xl font-psemibold">{username}</Text>
      </View>
      <Image
        source={images.logoSmall}
        resizeMode="contain"
        className="w-8 h-8"
      />
    </View>
  );
};

export default HomeHeader;
