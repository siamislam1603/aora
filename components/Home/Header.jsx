import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";
import { icons } from "../../constants";
import { searchSchema } from "../../validations";
import CustomTextInput from "../form-inputs/CustomTextInput";
import HomeHeader from "./HomeHeader";
import SearchHeader from "./SearchHeader";
import Slider from "./Slider";

const Header = ({ videos }) => {
  const { searchValue } = useLocalSearchParams();
  const pathname = usePathname();
  const isSearchScreen = pathname.startsWith("/search");
  const defaultValues = {
    searchValue: searchValue ?? "",
  };
  const formHook = useForm({
    resolver: yupResolver(yup.object(searchSchema)),
    defaultValues,
  });

  const { handleSubmit } = formHook;

  const handleFormSubmit = ({ searchValue }) => {
    router.push(`/search/${searchValue}`);
  };

  return (
    <View>
      <View className="space-y-5 p-4 pb-0">
        {isSearchScreen ? <SearchHeader /> : <HomeHeader />}
        <View>
          <CustomTextInput
            placeholder="Search for a video topic"
            endIcon={icons.search}
            {...formHook}
            name="searchValue"
            onIconPress={handleSubmit(handleFormSubmit)}
          />
        </View>
      </View>
      {!isSearchScreen && <Slider videos={videos} />}
    </View>
  );
};

export default Header;
