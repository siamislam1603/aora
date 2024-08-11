import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Home/Header";
import VideoCard from "../../components/Home/VideoCard";
import NoEmptyList from "../../components/NoEmptyList";
import { getPopularVideos } from "../../lib/appwrite";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getPopularVideos();
        setVideos(videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);
  return (
    <SafeAreaView className="h-full bg-primary p-4">
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
        ListHeaderComponent={() => <Header />}
        contentContainerStyle={{ gap: 20 }}
      />
    </SafeAreaView>
  );
};

export default HomePage;
