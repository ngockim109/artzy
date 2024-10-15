import { FlatList, Pressable } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

import "@/styles/styles.css";

const Filters = () => {
  const theme = useColorScheme() ?? "light";
  const DATA = [
    {
      id: "1",
      text: "Filter",
      icon: (
        <AntDesign
          name="caretdown"
          size={16}
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
          size={16}
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
          size={16}
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
          size={16}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      ),
    },
  ];

  const handleSelectFilter = (item) => {
    console.log("Selected filter:", item.text);
  };

  return (
    <FlatList
      data={DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={handleSelectFilter}
          className="flex items-center justify-center w-full"
        >
          <ThemedText
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            {item?.text}{" "}
          </ThemedText>
          {item?.icon}
        </Pressable>
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

export default Filters;
