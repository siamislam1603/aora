import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const tabs = [
  {
    name: "home",
    title: "Home",
    image: require("../../assets/icons/home.png"),
  },
  {
    name: "create",
    title: "Create",
    image: require("../../assets/icons/plus.png"),
  },
  {
    name: "profile",
    title: "Profile",
    image: require("../../assets/icons/profile.png"),
  },
  {
    name: "saved",
    title: "Saved",
    image: require("../../assets/icons/bookmark.png"),
  },
];

const TabBarIcon = ({ image, color, title, focused }) => {
  return (
    <View className="items-center gap-2">
      <Image
        source={image}
        resizeMode="contain"
        className={`h-6`}
        style={{ tintColor: color }}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} `}
        style={{ color }}
      >
        {title}
      </Text>
    </View>
  );
};
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#161622", height: 80 },
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarActiveTintColor: "#FFA001",
        tabBarShowLabel: false,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            title: tab.title,
            tabBarIcon: (...args) => <TabBarIcon {...args[0]} {...tab} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
