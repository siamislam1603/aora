import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SearchHeader = () => {
  const { searchValue } = useLocalSearchParams();
  return (
    <View>
      <Text className="text-gray-100 font-pregular">Search results</Text>
      <Text className="text-white text-2xl font-psemibold">{searchValue}</Text>
    </View>
  );
};

export default SearchHeader;
