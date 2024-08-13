import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/form-inputs/CustomTextInput";
import SingleFileUpload from "../../components/form-inputs/SingleFileUpload";
import { videoSchema } from "../../validations";

const defaultValues = {
  title: "",
  thumbnail: "",
  prompt: "",
  video: "",
};
const CreateScreen = () => {
  const formHook = useForm({
    resolver: yupResolver(yup.object(videoSchema)),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formHook;
  const handleFormSubmit = (reqPayload) => {
    console.log(reqPayload);
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ScrollView>
        <Text className="text-white text-2xl font-pmedium mb-10">
          Upload Video
        </Text>
        <View className="space-y-6">
          <View>
            <CustomTextInput
              label="Video Title"
              {...formHook}
              name="title"
              placeholder="Give your video a catchy title..."
            />
          </View>
          <View>
            <SingleFileUpload
              type="video"
              {...formHook}
              name="video"
              label="Upload Video"
            />
          </View>
          <View>
            <SingleFileUpload
              type="image"
              {...formHook}
              name="thumbnail"
              label="Thumbnail Image"
            />
          </View>
          <View>
            <CustomTextInput
              label="AI Prompt"
              {...formHook}
              name="prompt"
              placeholder="The AI prompt of your video..."
            />
          </View>
          <CustomButton
            title="Submit & Publish"
            buttonStyle="w-full"
            handlePress={handleSubmit(handleFormSubmit)}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateScreen;
