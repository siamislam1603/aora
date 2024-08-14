import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Controller } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";
import FormInputWrapper from "./FormInputWrapper";

const SingleFileUpload = (props) => {
  const { type, name, control, trigger } = props;
  const pickImageAsync = async ({ onChange }) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes:
        type === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled) {
      onChange({ assets: result.assets[0] });
    }
    await trigger(name);
  };
  return (
    <FormInputWrapper {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <TouchableOpacity
              className={`flex-1 flex flex-row justify-center ${
                type === "video"
                  ? !field.value?.hasOwnProperty("assets")
                    ? "py-14"
                    : ""
                  : ""
              }`}
              onPress={() => pickImageAsync(field)}
            >
              {field.value?.hasOwnProperty("assets") ? (
                type === "video" ? (
                  <Video
                    source={{
                      uri: field.value.assets.uri,
                    }}
                    resizeMode={ResizeMode.COVER}
                    className={"flex-1 w-full h-48"}
                    isLooping
                  />
                ) : (
                  <Image
                    source={{ uri: field.value.assets.uri }}
                    resizeMode="cover"
                    className="flex-1 w-full h-48"
                  />
                )
              ) : (
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
              )}
            </TouchableOpacity>
          );
        }}
      />
    </FormInputWrapper>
  );
};

export default SingleFileUpload;
