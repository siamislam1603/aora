import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/Home/ProfileHeader";
import VideoCard from "../../components/Home/VideoCard";
import LoadingScreen from "../../components/LoadingScreen";
import NoEmptyList from "../../components/NoEmptyList";
import { useAuth } from "../../contexts/GlobalContextProvider";
import { getVideosByUser } from "../../lib/appwrite";

const ProfileScreen = () => {
  const {
    user: { $id: userId },
  } = useAuth();

  const { data: videos, isLoading } = useQuery({
    queryKey: ["videos", userId],
    queryFn: () => getVideosByUser(userId),
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
        ListHeaderComponent={() => <ProfileHeader videos={videos} />}
        contentContainerStyle={{ gap: 20 }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
