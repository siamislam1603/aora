import React from "react";
import { ActivityIndicator, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

const LoadingScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={images.logo} resizeMode="contain" className="w-40" />
        <ActivityIndicator color="#FF9C01" size={50} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoadingScreen;
