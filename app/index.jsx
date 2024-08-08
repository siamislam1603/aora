import { Redirect, router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { useAuth } from "../contexts/GlobalContextProvider";

const OnboardScreen = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-full min-h-[85vh] items-center justify-center gap-y-5 px-3 py-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[375px] w-full h-[298px]"
          />
          <View className="relative">
            <Text className="font-psemibold text-3xl text-white text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200 relative">Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="absolute w-[75px] right-0 -bottom-[13px]"
            />
          </View>
          <Text className="text-center text-gray-100 text-sm">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            buttonStyle="w-full"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardScreen;
