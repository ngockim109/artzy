import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

import "@/styles/styles.css";
import Badge from "./atoms/Badge";

const Filters = () => {
  const theme = useColorScheme() ?? "light";
  const [activeIndex, setActiveIndex] = useState();
  const DATA = [
    {
      id: "1",
      text: "Filter",
      icon: "caretdown",
    },
    {
      id: "2",
      text: "Price",
      icon: "caretdown",
    },
    {
      id: "3",
      text: "GlassSurface",
      icon: "caretdown",
    },
    {
      id: "4",
      text: "On sale",
      icon: "caretdown",
    },
  ];

  const handleSelectFilter = (item) => {
    setActiveIndex(item?.id ?? -1);
    console.log("Selected filter:", item);
  };

  return (
    <FlatList
      data={DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="relative py-3">
          <Pressable
            onPress={() => handleSelectFilter(item)}
            style={({ pressed }) => [
              styles.pressable,
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor:
                  activeIndex === item?.id
                    ? theme === "light"
                      ? Colors.light.primary
                      : Colors.dark.primary
                    : "white",
                borderColor:
                  activeIndex === item?.id
                    ? theme === "light"
                      ? Colors.light.secondary
                      : Colors.dark.secondary
                    : theme === "light"
                    ? Colors.light.search
                    : Colors.dark.search,
              },
            ]}
          >
            <ThemedText
              lightColor={
                activeIndex === item?.id
                  ? "white"
                  : Colors.light.buttonOutlineText
              }
              darkColor={
                activeIndex === item?.id
                  ? "white"
                  : Colors.dark.buttonOutlineText
              }
            >
              {item?.text}
            </ThemedText>
            <AntDesign
              name={item?.icon}
              size={14}
              color={
                activeIndex === item?.id
                  ? "white"
                  : theme === "light"
                  ? Colors.light.icon
                  : Colors.dark.icon
              }
            />
          </Pressable>
          <Badge
            lightColor={Colors.light.badge}
            darkColor={Colors.dark.badge}
            borderColor={Colors.light.primary}
            textDarkColor={Colors.dark.badgeText}
            textLightColor={Colors.light.badgeText}
            text="1"
          />
        </View>
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 1,
    overflow: "visible",
    marginRight: 15,
    zIndex: 10,
  },
});

export default Filters;
