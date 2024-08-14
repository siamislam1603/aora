import React from "react";
import { Text, View } from "react-native";

const FormInputWrapper = ({ label, name, children, formState }) => {
  const errorMsg = !!formState?.errors ? formState.errors[name]?.message : null;
  return (
    <View className="space-y-2">
      {label && (
        <Text
          className={`${
            !!errorMsg ? "text-red-600" : "text-gray-100"
          } font-pregular text-lg`}
        >
          {label}
        </Text>
      )}
      <View
        className={`flex-row bg-black-100 rounded-lg min-h-[58px] items-center justify-between border focus:border-2 ${
          !!errorMsg
            ? "border-red-600"
            : "border-black-200 focus:border-secondary"
        } overflow-hidden`}
      >
        {children}
      </View>
      {!!errorMsg ? (
        <Text className="pl-4 text-red-600 text-sm font-pregular">
          {errorMsg}
        </Text>
      ) : null}
    </View>
  );
};

export default FormInputWrapper;
