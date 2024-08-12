import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants";

const VideoCard = ({
  prompt,
  title,
  thumbnail,
  video,
  creator: { avatar, username },
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View className="space-y-5 px-4">
      <View className="flex-row items-start space-x-5">
        <View className="flex-row flex-1 items-center space-x-3">
          <View className="relative w-12 h-12 border-2 border-secondary-100 rounded-lg">
            <Image
              source={{ uri: avatar }}
              resizeMode="contain"
              className="rounded-md absolute w-full h-full top-0 left-0"
            />
          </View>
          <View className="flex-1">
            <Text className="text-white font-psemibold" numberOfLines={1}>
              {title}
            </Text>
            <Text numberOfLines={1} className="text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={icons.menu} resizeMode="contain" className="w-6 h-5" />
        </TouchableOpacity>
      </View>
      {!isPlaying && (
        <ImageBackground
          source={{ uri: thumbnail }}
          resizeMode="cover"
          className="w-full h-52 rounded-lg relative"
          borderRadius={12}
        >
          <TouchableOpacity
            className="absolute w-full h-full flex items-center justify-center"
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Image
              source={icons.play}
              resizeMode="contain"
              className="w-14 h-14"
            />
          </TouchableOpacity>
        </ImageBackground>
      )}
      <Video
        source={{
          uri: video,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={isPlaying}
        isLooping
        className={isPlaying ? `h-52 w-full rounded-lg` : ""}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) setIsPlaying(!isPlaying);
        }}
      />
    </View>
  );
};

export default VideoCard;
