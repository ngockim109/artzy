import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
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
        className={`w-1/5 rounded-r-full flex px-3 py-2 items-center justify-center focus:opacity-80`}
        // style={({ pressed }) => [
        //   {
        //     opacity: pressed ? 0.7 : 1,
        //     backgroundColor:
        //       theme == "light" ? Colors.light.search : Colors.dark.search,
        //   },
        // ]}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(54, 108, 175)" : "white",
          },
        ]}
      >
        <Feather name="search" size={20} color="white" />
      </Pressable>

      {/* <TouchableOpacity className="w-full h-full py-2 px-3">
        <ThemedView
          lightColor={Colors.light.search}
          darkColor={Colors.dark.search}
          className="w-full rounded-r-full flex px-3 py-2 items-center justify-center"
        >
          <Feather name="search" size={20} color="white" />
        </ThemedView>
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchBar;
