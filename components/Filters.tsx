import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

import "@/styles/styles.css";
import Badge from "./atoms/Badge";

const Filters = () => {
  const theme = useColorScheme() ?? "light";
  const DATA = [
    {
      id: "1",
      text: "Filter",
      icon: (
        <AntDesign
          name="caretdown"
          size={14}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      ),
    },
    {
      id: "2",
      text: "Categories",
      icon: (
        <AntDesign
          name="caretdown"
          size={14}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      ),
    },
    {
      id: "3",
      text: "GlassSurface",
      icon: (
        <AntDesign
          name="caretdown"
          size={14}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      ),
    },
    {
      id: "4",
      text: "On sale",
      icon: (
        <AntDesign
          name="caretdown"
          size={14}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      ),
    },
  ];

  const handleSelectFilter = (item) => {
    console.log("Selected filter:", item);
  };

  return (
    <FlatList
      data={DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="relative">
          <Pressable
            style={styles.pressable}
            onPress={() => handleSelectFilter(item)}
            className={`flex flex-row gap-1 items-center justify-center mr-5 border rounded-full px-3 py-1 ${
              theme === "light" ? " border-primary" : " border-primary-light"
            }`}
          >
            <ThemedText
              lightColor={Colors.light.buttonOutlineText}
              darkColor={Colors.dark.buttonOutlineText}
            >
              {item?.text}
            </ThemedText>
            {item?.icon}
            <Badge
              lightColor={Colors.light.badge}
              darkColor={Colors.dark.badge}
              textDarkColor={Colors.dark.badgeText}
              textLightColor={Colors.light.badgeText}
              text="1"
            />
          </Pressable>
        </View>
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

const styles = StyleSheet.create({
  pressable: {
    overflow: "visible", // Ensure that the badge is not cut off
  },
});

export default Filters;
