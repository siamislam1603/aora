import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import FormInputWrapper from "./FormInputWrapper";

const InputRender = (props) => {
  const { placeholder, type, keyboardType, onBlur, onChangeText } = props;
  return (
    <TextInput
      placeholder={placeholder}
      {...(onBlur ? { onBlur } : {})}
      {...(onChangeText ? { onChangeText } : {})}
      {...(props.hasOwnProperty("value") ? { value } : {})}
      {...(props.hasOwnProperty("defaultValue") ? { defaultValue } : {})}
      placeholderTextColor="#7B7B8B"
      style={{ color: "#FFFFFF", paddingHorizontal: 16, flexGrow: 1 }}
      secureTextEntry={type === "password" && !showPassword}
      {...(!!keyboardType ? { keyboardType } : {})}
    />
  );
};

const InputAdornment = ({ onIconPress, icon }) => {
  const getIcon = () => (
    <Image
      source={icon}
      resizeMode="contain"
      className="w-6 h-6"
      style={{ marginRight: 16 }}
    />
  );
  if (!!onIconPress)
    return (
      <TouchableOpacity onPress={onIconPress}>{getIcon()}</TouchableOpacity>
    );
  return getIcon();
};

const CustomTextInput = (props) => {
  const { control, name, trigger, type, endIcon, onIconPress } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormInputWrapper {...props}>
      {!!control ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <InputRender
                {...props}
                onBlur={async (value) => {
                  onBlur(value);
                  await trigger(name);
                }}
                onChangeText={async (value) => {
                  onChange(value);
                  await trigger(name);
                }}
                value={value}
              />
            );
          }}
        />
      ) : (
        <InputRender {...props} />
      )}
      {type === "password" && (
        <InputAdornment
          onIconPress={() => setShowPassword(!showPassword)}
          icon={!showPassword ? icons.eye : icons.eyeHide}
        />
      )}
      {!!endIcon && <InputAdornment onIconPress={onIconPress} icon={endIcon} />}
    </FormInputWrapper>
  );
};

export default CustomTextInput;
