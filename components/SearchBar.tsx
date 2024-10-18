import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

import Feather from "@expo/vector-icons/Feather";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";

import "@/styles/styles.css";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePathname } from "expo-router";
type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};
const SearchBar = () => {
  const [value, setValue] = useState<string>();
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const currentPath = usePathname();
  const { query } = useLocalSearchParams<{ query?: string }>();

  const onChangeText = (text: string) => setValue(text);
  const handleSearch = () => {
    if (currentPath !== "/search") {
      // Only navigate if not already on the search screen
      router.push({ pathname: "/search", params: { query: value } });
    }
  };
  useEffect(() => {
    if (query) {
      setValue(query);
    }
  }, [query]);

  return (
    <View
      className={`flex flex-row rounded-full border ${
        theme === "light" ? " border-primary" : " border-primary-light"
      } `}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search tool name..."
        className={`w-4/5 rounded-l-full py-2 px-4`}
      />
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            backgroundColor:
              theme == "light" ? Colors.light.search : Colors.dark.search,
          },
          styles.pressable,
        ]}
        onPress={handleSearch}
      >
        <Feather name="search" size={20} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "20%",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
export default SearchBar;
