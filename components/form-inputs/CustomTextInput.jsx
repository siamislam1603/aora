import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import FormInputWrapper from "./FormInputWrapper";

const CustomTextInput = (props) => {
  const { control, name, trigger, placeholder, type, keyboardType } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormInputWrapper {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => {
          return (
            <TextInput
              placeholder={placeholder}
              onBlur={async (value) => {
                onBlur(value);
                await trigger(name);
              }}
              onChangeText={async (value) => {
                onChange(value);
                await trigger(name);
              }}
              value={value}
              placeholderTextColor="#7B7B8B"
              style={{ color: "#FFFFFF", paddingHorizontal: 16, flexGrow: 1 }}
              secureTextEntry={type === "password" && !showPassword}
              {...(!!keyboardType ? { keyboardType } : {})}
            />
          );
        }}
      />
      {type === "password" && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            resizeMode="contain"
            className="w-6 h-6"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      )}
    </FormInputWrapper>
  );
};

export default CustomTextInput;
