import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/form-inputs/CustomTextInput";
import { images } from "../../constants";
import { signIn } from "../../lib/appwrite";
import { signInSchema } from "../../validations";

const defaultValues = {
  email: "",
  password: "",
};
const SignInScreen = () => {
  const formHook = useForm({
    resolver: yupResolver(yup.object(signInSchema)),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formHook;

  const handleFormSubmit = async ({ email, password }) => {
    try {
      await signIn(email, password);
      Alert.alert("Success", "Signed-in successfully.");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View className="w-full min-h-[85vh] justify-center space-y-5 p-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Text className="font-psemibold text-2xl text-white py-5">
            Sign in
          </Text>
          <View className="space-y-6">
            <View>
              <CustomTextInput
                label="Email"
                {...formHook}
                name="email"
                placeholder="Your email"
                keyboardType="email-address"
              />
            </View>
            <View>
              <CustomTextInput
                label="Password"
                {...formHook}
                name="password"
                placeholder="Your password"
                type="password"
              />
            </View>
            <Link
              href="/"
              className="text-gray-100 text-right text-sm font-pregular"
            >
              Forgot password?
            </Link>
            <CustomButton
              title="Log In"
              isLoading={isSubmitting}
              handlePress={handleSubmit(handleFormSubmit)}
            />
            <Text className="font-pregular text-sm text-gray-100 text-center">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-secondary font-psemibold">
                Signup
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
