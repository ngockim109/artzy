import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import ITool from "@/interface/tool.interface";
import Empty from "@/components/Empty";
import Tools from "@/components/Tools";
import api from "@/api/api";
import IBrand from "@/interface/brand.interface";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { StyleSheet } from "react-native";
import ToolCard from "@/components/molecules/ToolCard";
import { calculatePrice } from "@/utils/calculatePrice";
import { averageRating } from "@/utils/averageRating";
import { getSelectedItemCount } from "@/utils/handleClear";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Favorites = () => {
  const [favoriteTools, setFavoriteTools] = useState<ITool[]>([]); // State to store favorite tools
  const [tools, setTools] = useState<ITool[]>([]);
  const [originalTools, setOriginalTools] = useState<ITool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteAsync, setFavoriteAsync] = useState();
  const [loadingDeal, setLoadingDeal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredTools, setFilteredTools] = useState(tools);
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [areSortApplied, setAreSortApplied] = useState(false);
  const [currentSortOption, setCurrentSortOption] =
    useState<string>("relevant");

  const [priceFilter, setPriceFilter] = useState<string>("Any price");
  const [glassSurfaceFilter, setGlassSurfaceFilter] = useState<string>("All");
  const [onSaleFilter, setOnSaleFilter] = useState<boolean | null>(null);
  const { getItem, setItem } = useAsyncStorage("favorites");
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [clearAllMode, setClearAllMode] = useState(false);
  const [clearMode, setClearMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheckBoxShow, setIsCheckBoxShow] = useState(false);
  const [isClearMode, setIsClearMode] = useState(false);

  const isFocused = useIsFocused();
  const getArtTools = async () => {
    try {
      const response = await api.get("art-tools");
      if (response.status == 200) {
        setTools(response.data);
        setOriginalTools(response.data);
      } else {
        console.error("Error fetching art tools: ", error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites); // Array of favorite tool IDs

        // Filter tools to find favorites by matching their IDs
        const favoriteTools = tools.filter((tool: ITool) =>
          favoriteIds.includes(tool.id)
        );

        setFavoriteTools(favoriteTools);
      }
    } catch (error) {
      console.error("Failed to fetch favorites from AsyncStorage", error);
    } finally {
      setLoading(false);
    }
  };
  const toggleSelectAll = (selectAll: boolean) => {
    const newSelectedItems = {};
    favoriteTools.forEach((tool) => {
      newSelectedItems[tool.id] = selectAll; // Select or deselect based on the flag
    });
    setSelectedItems(newSelectedItems);
  };

  const removeSelectedFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

      // Remove selected favorites from the list
      const updatedFavorites = favoriteIds.filter((id) => !selectedItems[id]);

      // Update AsyncStorage
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      clearDeleteFields();
    } catch (error) {
      console.error("Error removing favorites:", error);
    }
  };

  const handleClickClearAllButton = () => {
    setIsClearMode(true);
    setClearAllMode((prevClearAllMode) => {
      // Toggle the selection based on the previous state
      toggleSelectAll(!prevClearAllMode);
      return !prevClearAllMode; // Update the clear all mode state
    });
    setIsCheckBoxShow(true);
  };

  const handleExitClearMode = () => {
    setIsClearMode(false);
    setSelectedItems({});
    setIsCheckBoxShow(false);
  };
  useEffect(() => {
    getArtTools();
  }, []);

  const clearDeleteFields = () => {
    setSelectedItems({});
    setClearMode(false);
    setClearAllMode(false);
    setIsModalVisible(false); // Exit clear all mode after removal
    fetchFavorites();
  };
  useEffect(() => {
    fetchFavorites();
  }, [favoriteTools, isFocused]);
  useEffect(() => {
    const selectedCount = getSelectedItemCount(selectedItems);

    // If no items are selected, disable clear all mode
    if (selectedCount === 0) {
      setClearAllMode(false);
    }
  }, [selectedItems]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "", light: "" }}
      hideHeader
    >
      <View className="mt-3">
        {/* handle search bar */}
        <ThemedText
          type="subtitle"
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
        >
          Favorites
        </ThemedText>
        {loading ? (
          <ActivityIndicator color={Colors.light.primary} />
        ) : favoriteTools.length > 0 ? (
          <ThemedView className="my-3">
            {/* Button clear, clear all, remove */}
            <ThemedView
              className={`flex-row items-center ${
                isClearMode ? "justify-between" : "justify-end"
              } `}
            >
              <ThemedView className="flex-row gap-2 items-center">
                {isClearMode ? (
                  <TouchableOpacity onPress={handleExitClearMode}>
                    <AntDesign
                      name="closecircleo"
                      size={24}
                      color={Colors.light.primary}
                    />
                  </TouchableOpacity>
                ) : null}
                {isClearMode ? (
                  <ThemedView>
                    <ThemedText
                      type="large"
                      lightColor={Colors.light.gray}
                      darkColor={Colors.dark.gray}
                    >
                      {getSelectedItemCount(selectedItems)} items selected
                    </ThemedText>
                  </ThemedView>
                ) : null}
              </ThemedView>
              <ThemedView className="flex-row gap-2">
                <TouchableOpacity onPress={handleClickClearAllButton}>
                  <ThemedView
                    lightColor={Colors.light.background}
                    darkColor={Colors.dark.background}
                    style={{ borderColor: Colors.light.primary }}
                    className="py-1 px-2 rounded-full border"
                  >
                    <ThemedText
                      lightColor={Colors.light.primary}
                      darkColor={Colors.dark.primary}
                    >
                      {clearAllMode ? "Deselect all" : "Clear All"}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
            {isClearMode ? (
              <ThemedView className="flex-row justify-end my-2">
                <TouchableOpacity onPress={removeSelectedFavorites}>
                  <FontAwesome5
                    name="trash"
                    size={24}
                    color={Colors.light.primary}
                  />
                </TouchableOpacity>
              </ThemedView>
            ) : null}
            <ThemedView className="flex-wrap flex-row justify-between">
              {favoriteTools.map((item) => (
                <View key={item.id} style={{ width: "48%" }}>
                  <ToolCard
                    deal={item?.limitedTimeDeal}
                    numberOfRating={item?.feedbacks?.length ?? 0}
                    oldPrice={item?.price}
                    price={calculatePrice(item?.limitedTimeDeal, item?.price)}
                    rating={averageRating(item?.feedbacks)}
                    source={item?.image}
                    toolName={item?.artName}
                    key={item?.id}
                    id={item?.id}
                    glassSurface={item?.glassSurface}
                    isChecked={!!selectedItems[item.id]}
                    onPress={() => {
                      setSelectedItems((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id], // Toggle selection
                      }));
                    }}
                    onLongPress={() => {
                      setIsCheckBoxShow(true);
                      // setClearMode(true);
                      setSelectedItems((prev) => ({
                        ...prev,
                        [item.id]: true,
                      }));
                    }}
                    noCardWidth
                    isShowCheckBox={isCheckBoxShow}
                  />
                </View>
              ))}
            </ThemedView>
          </ThemedView>
        ) : (
          <ThemedView className="w-full h-full items-center justify-center">
            <Empty
              description="No favorite tools yet!"
              icon="frown"
              title="Empty List!"
              noAction
            />
          </ThemedView>
        )}
      </View>
    </ParallaxScrollView>
  );
};

export default Favorites;
