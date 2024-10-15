import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";

import Feather from "@expo/vector-icons/Feather";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";

import "@/styles/styles.css";
import { useColorScheme } from "@/hooks/useColorScheme.web";
type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};
const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const theme = useColorScheme() ?? "light";
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
