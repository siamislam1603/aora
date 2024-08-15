import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Home/Header";
import VideoCard from "../../components/Home/VideoCard";
import LoadingScreen from "../../components/LoadingScreen";
import NoEmptyList from "../../components/NoEmptyList";
import { getPopularVideos } from "../../lib/appwrite";

export const HomeContext = createContext();
const HomePage = () => {
  const queryClient = useQueryClient();
  const {
    data: videos,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getPopularVideos,
  });

  if (isLoading) return <LoadingScreen hideLogo={true} />;
  const refetchVideos = async () => {
    await queryClient.refetchQueries({
      queryKey: ["videos"],
      type: "active",
      exact: true,
    });
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor="#FF9C01"
            colors={["#FF9C01"]}
            refreshing={isRefetching}
            onRefresh={refetchVideos}
          />
        }
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

export default HomePage;
