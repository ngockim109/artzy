import { View, TextInput, Pressable, StyleSheet } from "react-native";
import React from "react";

import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";

import "@/styles/styles.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  handleSearch: () => void;
  clearSearchValue: () => void;
};
const SearchBarNotPage = ({
  value,
  onChangeText,
  handleSearch,
  clearSearchValue,
}: SearchBarProps) => {
  const theme = useColorScheme() ?? "light";
  const textColor = useThemeColor({}, "textSearchBar");
  const placeholderColor = useThemeColor({}, "textSearchBar");
  const searchButtonColor = useThemeColor({}, "search");
  console.log(value);
  return (
    <View>
      <View
        className={`flex flex-row rounded-full border items-center justify-between px-4 ${
          theme === "light" ? " border-primary" : " border-primary-light"
        } `}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search tool name..."
          style={{
            color: placeholderColor,
          }}
          placeholderTextColor={placeholderColor}
          className={`flex-1 rounded-l-full py-2 px-2`}
        />
        {value.length > 0 && (
          <Pressable
            onPress={clearSearchValue}
            className="w-8 justify-center align-middle"
          >
            <AntDesign name="close" size={16} color={Colors.light.gray} />
          </Pressable>
        )}
      </View>
      {value.length > 0 ? (
        <View style={styles.card}>
          <Pressable
            onPress={handleSearch}
            className={`rounded-full w-full py-2 px-4 text-primary ${
              theme === "light" ? "text-primary-dark" : "text-primary"
            }`}
          >
            <View className="w-full flex-row gap-2 items-center px-2">
              <AntDesign
                name="search1"
                size={16}
                color={Colors.light.gray}
              ></AntDesign>
              <ThemedText numberOfLines={1} className="px-2">
                {value}
              </ThemedText>
            </View>
          </Pressable>
        </View>
      ) : null}
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
  card: {
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 40,
    zIndex: 100,
  },
});
export default SearchBarNotPage;
