import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import "@/styles/styles.css";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SortTools = ({ onSortChange }) => {
  const theme = useColorScheme() ?? "light";
  const [sortText, setSortText] = useState<string>("Sort");
  const [sortField, setSortField] = useState<string>("relevant");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSort, setIsSort] = useState<boolean>(false);
  const bottomSheetModalSortRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%"], []);
  const toggleModalVisibility = () => {
    if (isModalVisible) {
      bottomSheetModalSortRef.current?.close(); // Close modal if it's visible
    } else {
      bottomSheetModalSortRef.current?.present(); // Open modal if it's not visible
    }
    setIsModalVisible(!isModalVisible); // Toggle the state
  };

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.9}
        onPress={() => bottomSheetModalSortRef.current?.close()}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleModalSortDismiss = () => {
    bottomSheetModalSortRef.current?.close();
    setIsModalVisible(false);
  };

  const handleSelectFilter = () => {
    toggleModalVisibility();
  };

  // callbacks
  const handleSheetSortChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSortFieldChange = (value: string, name: string) => {
    setSortField(value);
    if (value === "relevant") {
      setIsSort(false);
      setSortText("Sort");
    } else {
      setIsSort(true);
      setSortText(name);
    }
    onSortChange(value);
    bottomSheetModalSortRef.current?.close();
    setIsModalVisible(false);
  };

  const sortFieldData = [
    { id: "relevant", name: "Relevant" },
    { id: "highestPrice", name: "Highest Price" },
    { id: "lowestPrice", name: "Lowest Price" },
    { id: "highestDeal", name: "Highest Deal" },
    { id: "lowestDeal", name: "Lowest Deal" },
    { id: "highestAvgReview", name: "Highest Avg Review" },
    { id: "lowestAvgReview", name: "Lowest Avg Review" },
  ];

  return (
    <>
      <View className="w-16 py-2">
        <Pressable
          onPress={() => handleSelectFilter()}
          style={({ pressed }) => [
            styles.pressable,
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: isSort
                ? theme === "light"
                  ? Colors.light.primary
                  : Colors.dark.primary
                : "white",
              borderColor: isSort
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
            lightColor={isSort ? "white" : Colors.light.buttonOutlineText}
            darkColor={isSort ? "white" : Colors.dark.buttonOutlineText}
          >
            {sortText}
          </ThemedText>
          <FontAwesome
            name="sort"
            size={14}
            color={
              isSort
                ? "white"
                : theme === "light"
                ? Colors.light.icon
                : Colors.dark.icon
            }
          />
        </Pressable>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalSortRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetSortChanges}
        onDismiss={handleModalSortDismiss}
        backdropComponent={renderBackdrop}
      >
        <TouchableWithoutFeedback onPress={handleModalSortDismiss}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <BottomSheetView style={styles.contentContainer}>
          <ThemedText type="subtitle" className="mb-2">
            Sort by
          </ThemedText>
          {sortFieldData?.map((item) => (
            <TouchableOpacity
              key={item?.id}
              onPress={() => handleSortFieldChange(item?.id, item?.name)}
            >
              <ThemedView className="flex-row gap-2 items-center py-3">
                <View
                  style={[
                    styles.radio,
                    sortField === item?.id && styles.radioSelected,
                  ]}
                />

                <ThemedText
                  lightColor={
                    sortField === item?.id
                      ? Colors.light.text
                      : Colors.light.text
                  }
                  darkColor={
                    sortField === item?.id ? Colors.dark.text : Colors.dark.text
                  }
                >
                  {item?.name}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
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
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  inputEnabled: {
    width: "41%",
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputDisabled: {
    width: "41%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  radioSelected: {
    backgroundColor: Colors.light.primary,
  },
  separator: {
    height: 1,
    width: 15,
    backgroundColor: Colors.light.primary,
    marginHorizontal: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});

export default SortTools;
