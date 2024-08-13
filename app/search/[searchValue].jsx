import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Home/Header";
import VideoCard from "../../components/Home/VideoCard";
import LoadingScreen from "../../components/LoadingScreen";
import NoEmptyList from "../../components/NoEmptyList";
import { getFilteredVideos } from "../../lib/appwrite";

const SearchResultsScreen = () => {
  const { searchValue } = useLocalSearchParams();

  const {
    data: videos,
    isLoading,
  } = useQuery({
    queryKey: ["videos", { searchValue }],
    queryFn: () => getFilteredVideos(searchValue),
  });

  if (isLoading) return <LoadingScreen hideLogo={true} />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={() => (
          <NoEmptyList
            title="No Videos Found"
            subtitle="Be first to create new video"
            buttonText="+ Add Video"
            buttonHref="/create"
          />
        )}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => <Header videos={videos} />}
        contentContainerStyle={{ gap: 20 }}
      />
    </SafeAreaView>
  );
};

export default SearchResultsScreen;
