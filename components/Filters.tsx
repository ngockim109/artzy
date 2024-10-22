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
import { ThemedText } from "./ThemedText";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import "@/styles/styles.css";
import Badge from "./atoms/Badge";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { filterTools, isValidPrice } from "@/utils/filterTools";

const Filters = ({ onFilterChange }) => {
  const theme = useColorScheme() ?? "light";
  const [activeIndex, setActiveIndex] = useState();
  const [price, setPrice] = useState<string>("Any price");
  const [priceText, setPriceText] = useState<string>("Price");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [glassSurface, setGlassSurface] = useState<string>("All");
  const [glassSurfaceText, setGlassSurfaceText] =
    useState<string>("Categories");
  const [onSale, setOnSale] = useState<boolean | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isGlassSurfaceModalVisible, setIsGlassSurfaceModalVisible] =
    useState<boolean>(false);
  const bottomSheetModalGlassSurfaceRef = useRef<BottomSheetModal>(null);

  const DATA = [
    {
      id: "1",
      text: "Filter",
      icon: "indent-right",
    },
    {
      id: "2",
      text: priceText,
      icon: "caretdown",
    },
    {
      id: "3",
      text: glassSurfaceText,
      icon: "caretdown",
    },
    {
      id: "4",
      text: "On sale",
      icon: "tags",
    },
  ];
  const snapPoints = useMemo(() => ["30%"], []);
  const toggleModalVisibility = () => {
    if (isModalVisible) {
      bottomSheetModalRef.current?.close(); // Close modal if it's visible
    } else {
      bottomSheetModalRef.current?.present(); // Open modal if it's not visible
    }
    setIsModalVisible(!isModalVisible); // Toggle the state
  };
  const toggleModalGlassSurfaceVisibility = () => {
    if (isGlassSurfaceModalVisible) {
      bottomSheetModalGlassSurfaceRef.current?.close(); // Close modal if it's visible
    } else {
      bottomSheetModalGlassSurfaceRef.current?.present(); // Open modal if it's not visible
    }
    setIsGlassSurfaceModalVisible(!isGlassSurfaceModalVisible); // Toggle the state
  };

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.9}
        onPress={() => bottomSheetModalRef.current?.close()}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleModalDismiss = () => {
    bottomSheetModalRef.current?.close();
    if (minPrice === "" && maxPrice === "") {
      setPrice("Any price");
      setPriceText("Price");
    }
    setIsModalVisible(false);
  };
  const handleModalGlassSurfaceDismiss = () => {
    bottomSheetModalGlassSurfaceRef.current?.close();
    setIsGlassSurfaceModalVisible(false);
  };

  const handleSelectFilter = (item) => {
    setActiveIndex(item?.id ?? "");
    let updatedOnSale = onSale;
    if (item?.id === "2") {
      toggleModalVisibility();
    } else if (item?.id === "3") {
      toggleModalGlassSurfaceVisibility();
    } else if (item?.id === "4") {
      updatedOnSale = updatedOnSale === true ? null : true;
      setOnSale(updatedOnSale);
      let priceFilter =
        price === "InRange" ? `${minPrice}-${maxPrice}` : "Any price";
      onFilterChange({
        price: priceFilter,
        onSale: updatedOnSale,
        glassSurface,
      });
    }
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSheetGlassSurfaceChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePriceChange = (value) => {
    setPrice(value);

    if (value !== "InRange") {
      setPriceText("Price");
      setMinPrice("");
      setMaxPrice("");
    }
  };
  const handleGlassSurfaceChange = (value) => {
    setGlassSurface(value);
    if (value === "true") {
      setGlassSurfaceText("Glass Surface");
    } else if (value === "false") {
      setGlassSurfaceText("No Glass Surface");
    } else {
      setGlassSurfaceText("Categories");
    }

    bottomSheetModalGlassSurfaceRef.current?.close();
    setIsGlassSurfaceModalVisible(false);
    let priceFilter =
      price === "InRange" ? `${minPrice}-${maxPrice}` : "Any price";
    onFilterChange({ price: priceFilter, onSale, glassSurface: value });
  };
  const handlePriceFilter = () => {
    if (
      price === "InRange" &&
      !isValidPrice(minPrice) &&
      !isValidPrice(maxPrice)
    ) {
      alert("Please enter valid numbers for min and max prices.");
      return;
    }

    if (price === "InRange" && parseFloat(maxPrice) <= parseFloat(minPrice)) {
      alert("Max price cannot be less than or equal min price.");
      return;
    }
    console.log(minPrice);
    console.log(maxPrice);
    if (minPrice === "") {
      setPriceText(`Any to $${maxPrice}`);
    } else if (maxPrice === "") {
      setPriceText(`$${minPrice} to any`);
    } else {
      setPriceText(`$${minPrice}-$${maxPrice}`);
    }

    let priceFilter =
      price === "InRange" ? `${minPrice}-${maxPrice}` : "Any price";

    onFilterChange({ price: priceFilter, onSale, glassSurface });
    bottomSheetModalRef.current?.close();
    setIsModalVisible(false);
  };
  return (
    <>
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const appliedFiltersCount = [
            price !== "Any price" ? 1 : 0,
            glassSurface !== "All" ? 1 : 0,
            onSale !== null ? 1 : 0,
          ].reduce((acc, cur) => acc + cur, 0);
          return (
            <View className="relative py-2">
              <Pressable
                onPress={() => handleSelectFilter(item)}
                style={({ pressed }) => [
                  styles.pressable,
                  {
                    opacity: pressed ? 0.7 : 1,
                    backgroundColor:
                      (item?.text === priceText && price !== "Any price") ||
                      (item?.text === "On sale" && onSale !== null) ||
                      (item?.text === glassSurfaceText &&
                        glassSurface !== "All") ||
                      (item?.text === "Filter" && appliedFiltersCount > 0)
                        ? theme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary
                        : "white",
                    borderColor:
                      (item?.text === priceText && price !== "Any price") ||
                      (item?.text === "On sale" && onSale !== null) ||
                      (item?.text === glassSurfaceText &&
                        glassSurface !== "All") ||
                      (item?.text === "Filter" && appliedFiltersCount > 0)
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
                    (item?.text === priceText && price !== "Any price") ||
                    (item?.text === "On sale" && onSale !== null) ||
                    (item?.text === glassSurfaceText &&
                      glassSurface !== "All") ||
                    (item?.text === "Filter" && appliedFiltersCount > 0)
                      ? "white"
                      : Colors.light.buttonOutlineText
                  }
                  darkColor={
                    (item?.text === priceText && price !== "Any price") ||
                    (item?.text === "On sale" && onSale !== null) ||
                    (item?.text === glassSurfaceText &&
                      glassSurface !== "All") ||
                    (item?.text === "Filter" && appliedFiltersCount > 0)
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
                    (item?.text === priceText && price !== "Any price") ||
                    (item?.text === "On sale" && onSale !== null) ||
                    (item?.text === glassSurfaceText &&
                      glassSurface !== "All") ||
                    (item?.text === "Filter" && appliedFiltersCount > 0)
                      ? "white"
                      : theme === "light"
                      ? Colors.light.icon
                      : Colors.dark.icon
                  }
                />
              </Pressable>
              {item?.text === "Filter" && appliedFiltersCount > 0 ? (
                <Badge
                  lightColor={Colors.light.badge}
                  darkColor={Colors.dark.badge}
                  borderColor={Colors.light.primary}
                  textDarkColor={Colors.dark.badgeText}
                  textLightColor={Colors.light.badgeText}
                  text={appliedFiltersCount}
                />
              ) : null}
            </View>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onDismiss={handleModalDismiss}
        backdropComponent={renderBackdrop}
      >
        <TouchableWithoutFeedback onPress={handleModalDismiss}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <BottomSheetView style={styles.contentContainer}>
          <ThemedText type="subtitle" className="mb-2">
            Price
          </ThemedText>
          <ThemedView>
            <TouchableOpacity onPress={() => handlePriceChange("Any price")}>
              <ThemedView className="flex-row gap-2 items-center ">
                <View
                  style={[
                    styles.radio,
                    price === "Any price" && styles.radioSelected,
                  ]}
                />
                <ThemedText>Any price</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
          <ThemedView className="flex-row gap-2 mt-2">
            <TouchableOpacity onPress={() => handlePriceChange("InRange")}>
              <ThemedView className="flex-row gap-2 items-center ">
                <View
                  style={[
                    styles.radio,
                    price === "InRange" && styles.radioSelected,
                  ]}
                />
                <ThemedText>In range</ThemedText>
              </ThemedView>
              <ThemedView className="flex-row gap-5 justify-between items-center w-full mt-3">
                <TextInput
                  placeholder="Min Price"
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={(text) => setMinPrice(text)}
                  editable={price === "InRange"}
                  style={
                    price === "InRange"
                      ? styles.inputEnabled
                      : styles.inputDisabled
                  }
                />
                <ThemedView style={styles.separator}></ThemedView>
                <TextInput
                  placeholder="Max Price"
                  value={maxPrice}
                  onChangeText={(text) => setMaxPrice(text)}
                  editable={price === "InRange"}
                  style={
                    price === "InRange"
                      ? styles.inputEnabled
                      : styles.inputDisabled
                  }
                />
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
          <TouchableOpacity onPress={handlePriceFilter}>
            <ThemedView
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
              className="w-full rounded-full p-2 mt-3"
            >
              <ThemedText
                type="defaultSemiBold"
                lightColor={Colors.light.buttonPrimaryText}
                darkColor={Colors.dark.buttonPrimaryText}
                className="text-center"
              >
                Show results
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalGlassSurfaceRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetGlassSurfaceChanges}
        onDismiss={handleModalGlassSurfaceDismiss}
        backdropComponent={renderBackdrop}
      >
        <TouchableWithoutFeedback onPress={handleModalGlassSurfaceDismiss}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <BottomSheetView style={styles.contentContainer}>
          <ThemedText type="subtitle" className="mb-2">
            GlassSurface
          </ThemedText>
          <ThemedView>
            <TouchableOpacity onPress={() => handleGlassSurfaceChange("All")}>
              <ThemedView
                className="flex-row gap-2 items-center p-2 w-full rounded-md border border-primary"
                lightColor={
                  glassSurface === "All"
                    ? Colors.light.primary
                    : Colors.light.background
                }
                darkColor={
                  glassSurface === "All"
                    ? Colors.dark.primary
                    : Colors.dark.background
                }
              >
                <ThemedText
                  lightColor={
                    glassSurface === "All"
                      ? Colors.light.buttonPrimaryText
                      : Colors.light.primary
                  }
                  darkColor={
                    glassSurface === "All"
                      ? Colors.dark.buttonPrimaryText
                      : Colors.dark.primary
                  }
                >
                  All
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
          <ThemedView>
            <TouchableOpacity onPress={() => handleGlassSurfaceChange("true")}>
              <ThemedView
                className="my-2 flex-row gap-2 items-center p-2 w-full rounded-md border border-primary"
                lightColor={
                  glassSurface === "true"
                    ? Colors.light.primary
                    : Colors.light.background
                }
                darkColor={
                  glassSurface === "true"
                    ? Colors.dark.primary
                    : Colors.dark.background
                }
              >
                <ThemedText
                  lightColor={
                    glassSurface === "true"
                      ? Colors.light.buttonPrimaryText
                      : Colors.light.primary
                  }
                  darkColor={
                    glassSurface === "true"
                      ? Colors.dark.buttonPrimaryText
                      : Colors.dark.primary
                  }
                >
                  Glass Surface
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
          <ThemedView>
            <TouchableOpacity onPress={() => handleGlassSurfaceChange("false")}>
              <ThemedView
                className="flex-row gap-2 items-center p-2 w-full rounded-md border border-primary"
                lightColor={
                  glassSurface === "false"
                    ? Colors.light.primary
                    : Colors.light.background
                }
                darkColor={
                  glassSurface === "false"
                    ? Colors.dark.primary
                    : Colors.dark.background
                }
              >
                <ThemedText
                  lightColor={
                    glassSurface === "false"
                      ? Colors.light.buttonPrimaryText
                      : Colors.light.primary
                  }
                  darkColor={
                    glassSurface === "false"
                      ? Colors.dark.buttonPrimaryText
                      : Colors.dark.primary
                  }
                >
                  No Glass Surface
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
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

export default Filters;
