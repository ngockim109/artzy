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
      text: "Price",
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
        <View className="relative py-3">
          <Pressable
            onPress={() => handleSelectFilter(item)}
            style={({ pressed }) => [
              styles.pressable,
              {
                opacity: pressed ? 0.7 : 1,
                borderColor:
                  theme === "light" ? Colors.light.search : Colors.dark.search,
              },
            ]}
          >
            <ThemedText
              lightColor={Colors.light.buttonOutlineText}
              darkColor={Colors.dark.buttonOutlineText}
            >
              {item?.text}
            </ThemedText>
            {item?.icon}
          </Pressable>
          <Badge
            lightColor={Colors.light.badge}
            darkColor={Colors.dark.badge}
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
