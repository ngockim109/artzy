import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import "@/styles/styles.css";
import Badge from "../atoms/Badge";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ThemedView } from "../ThemedView";
import { filterTools, isValidPrice } from "@/utils/filterTools";
import IRatingData from "@/interface/rating-data.interface";
import { countRatingByStar } from "@/utils/averageRating";
import IFeedback from "@/interface/feedback.interface";

const createRatingData = (feedbacks: IFeedback[]): IRatingData[] => {
  const ratingData: IRatingData[] = [{ id: "All", count: feedbacks.length }];

  for (let i = 1; i <= 5; i++) {
    ratingData.push({
      id: String(i),
      count: countRatingByStar(feedbacks, i),
    });
  }

  return ratingData;
};

type FilterStarProps = {
  onFilterChange: (selectedId: string) => void;
  feedbacks: IFeedback[];
};
const FilterStar = ({ onFilterChange, feedbacks }: FilterStarProps) => {
  const theme = useColorScheme() ?? "light";
  const [activeIndex, setActiveIndex] = useState<string>("All");
  const ratingData = createRatingData(feedbacks);
  const handleSelectFilter = (item) => {
    setActiveIndex(item?.id ?? "");
    onFilterChange(item?.id);
  };

  return (
    <>
      <FlatList
        data={ratingData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View className="relative py-2">
              <Pressable
                onPress={() => handleSelectFilter(item)}
                style={({ pressed }) => [
                  styles.pressable,
                  {
                    opacity: pressed ? 0.7 : 1,
                    backgroundColor:
                      item?.id === activeIndex
                        ? theme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary
                        : "white",
                    borderColor:
                      theme === "light"
                        ? Colors.light.secondary
                        : Colors.dark.secondary,
                  },
                ]}
              >
                <ThemedText
                  lightColor={
                    item?.id === activeIndex
                      ? "white"
                      : Colors.light.buttonOutlineText
                  }
                  darkColor={
                    item?.id === activeIndex
                      ? "white"
                      : Colors.dark.buttonOutlineText
                  }
                >
                  {item.id === "All" ? "All" : `${item.id} star`} ({item.count})
                </ThemedText>
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    </>
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

export default FilterStar;
