import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const VideoItem = ({ thumbnail, activeItem, $id, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Animatable.View
      animation={activeItem === $id ? zoomIn : zoomOut}
      className="shadow w-[148px] h-[236px] relative rounded-3xl overflow-hidden"
    >
      {!isPlaying && (
        <Image
          source={{ uri: thumbnail }}
          resizeMode="cover"
          className="absolute w-full h-full"
        />
      )}
      <TouchableOpacity
        className="absolute w-full h-full flex items-center justify-center"
        onPress={() => setIsPlaying(!isPlaying)}
      >
        <Image source={icons.play} resizeMode="contain" className="w-12 h-12" />
      </TouchableOpacity>
      <Video
        source={{
          uri: video,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={isPlaying}
        isLooping
        className={isPlaying ? `absolute w-full h-full` : ""}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) setIsPlaying(!isPlaying);
        }}
      />
    </Animatable.View>
  );
};
const Slider = ({ videos }) => {
  const [activeItem, setActiveItem] = useState(videos[0].$id);
  return (
    <>
      <Text className="text-gray-100 text-sm font-pregular my-5 px-4">
        Trending Videos
      </Text>
      <FlatList
        horizontal
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoItem {...item} activeItem={activeItem} />
        )}
        contentContainerStyle={{ gap: 12 }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length) setActiveItem(viewableItems[0].item.$id);
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170 }}
      />
    </>
  );
};

export default Slider;
