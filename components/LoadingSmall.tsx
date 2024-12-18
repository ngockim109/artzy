import { ActivityIndicator } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

const LoadingSmall = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemedView className="flex flex-row w-full align-middle justify-center">
      <ActivityIndicator
        size="small"
        color={colorScheme === "light" ? Colors.light.icon : Colors.dark.icon}
      />
    </ThemedView>
  );
};

export default LoadingSmall;
