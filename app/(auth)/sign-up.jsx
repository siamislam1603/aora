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
import { createUser } from "../../lib/appwrite";
import { signUpSchema } from "../../validations";

const defaultValues = {
  email: "",
  password: "",
  username: "",
  passwordConfirmation: "",
};
const SignUpScreen = () => {
  const formHook = useForm({
    resolver: yupResolver(yup.object(signUpSchema)),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formHook;

  const handleFormSubmit = async (reqPayload) => {
    try {
      await createUser(reqPayload);
      Alert.alert("Success", "Signed-in successfully.");
      router.replace("/home");
    } catch (error) {
      console.log(error)
      Alert.alert("Error", error?.response?.data?.message);
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
            Sign up
          </Text>
          <View className="space-y-6">
            <View>
              <CustomTextInput
                label="Username"
                {...formHook}
                name="username"
                placeholder="Your username"
              />
            </View>
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
            <View>
              <CustomTextInput
                label="Confirm password"
                {...formHook}
                name="passwordConfirmation"
                placeholder="Retype password"
                type="password"
              />
            </View>
            <CustomButton
              title="Sign Up"
              isLoading={isSubmitting}
              handlePress={handleSubmit(handleFormSubmit)}
            />
            <Text className="font-pregular text-sm text-gray-100 text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-secondary font-psemibold">
                Login
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
