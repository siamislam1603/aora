import { router } from "expo-router";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";
import { useAuth } from "../../contexts/GlobalContextProvider";
import { signOut } from "../../lib/appwrite";

const ProfileStats = ({ stats }) => {
  return (
    <View className="flex-row space-x-8 py-5">
      {stats.map((stat, i) => (
        <View className="items-center" key={i}>
          <Text className="text-white text-xl font-pmedium">{stat.title}</Text>
          <Text className="text-gray-100 font-pregular">
            {stat.description}
          </Text>
        </View>
      ))}
    </View>
  );
};
const ProfileHeader = ({ videos }) => {
  const { user, setUser, setIsLoggedIn } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", "Failed to logout!");
    }
  };

  return (
    <View className="p-4 pb-0">
      <TouchableOpacity
        onPress={handleLogout}
        className="self-end"
        activeOpacity={0.7}
      >
        <Image source={icons.logout} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
      <View className="items-center space-y-2">
        <View className="relative overflow-hidden rounded-lg w-14 h-14 border-2 border-secondary-100">
          <Image
            source={{ uri: user.avatar }}
            resizeMode="cover"
            className="absolute w-full h-full"
          />
        </View>
        <Text className="text-white text-lg font-pmedium">{user.username}</Text>
        <ProfileStats
          stats={[
            { title: videos.length, description: "Posts" },
            { title: "1.2k", description: "Views" },
          ]}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
