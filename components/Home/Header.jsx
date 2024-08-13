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
  const isHomeScreen = pathname.startsWith("/home");
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

  const getHeader = () => {
    if (pathname.startsWith("/search")) {
      return <SearchHeader />;
    }
    return <HomeHeader />;
  };

  return (
    <View>
      <View className="space-y-5 p-4 pb-0">
        {getHeader()}
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
      {isHomeScreen && <Slider videos={videos} />}
    </View>
  );
};

export default Header;
