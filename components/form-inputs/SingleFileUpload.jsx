import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";
import FormInputWrapper from "./FormInputWrapper";

const SingleFileUpload = (props) => {
  const { type, name, control } = props;
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes:
        type === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <FormInputWrapper {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => {
          return (
            <TouchableOpacity
              className={`flex-1 flex flex-row justify-center ${
                type === "video" ? "py-14" : ""
              }`}
              onPress={pickImageAsync}
            >
              <View
                className={`${
                  type === "video"
                    ? "border border-dashed border-secondary-100 p-3"
                    : ""
                } flex flex-row space-x-2 items-center justify-center`}
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
                {type === "image" && (
                  <Text className="text-white font-pregular">
                    Choose a file
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </FormInputWrapper>
  );
};

export default SingleFileUpload;
