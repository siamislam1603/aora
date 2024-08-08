import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Home/Header";
import NoEmptyList from "../../components/NoEmptyList";

const HomePage = () => {
  return (
    <SafeAreaView className="h-full bg-primary p-4">
      <FlatList
        data={[]}
        ListEmptyComponent={() => (
          <NoEmptyList
            title="No Videos Found"
            subtitle="Be first to create new video"
            buttonText="+ Add Video"
            buttonHref="/create"
          />
        )}
        ListHeaderComponent={() => <Header />}
      />
    </SafeAreaView>
  );
};

export default HomePage;
