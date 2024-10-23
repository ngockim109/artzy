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
  const toggleSelectAll = () => {
    const newSelectedItems = {};
    if (clearAllMode) {
      // If in clear all mode, select all
      favoriteTools.forEach((tool) => {
        newSelectedItems[tool.id] = true;
      });
    } else {
      // Otherwise, deselect all
      favoriteTools.forEach((tool) => {
        newSelectedItems[tool.id] = false;
      });
    }
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
      setSelectedItems({});
      setClearAllMode(false); // Exit clear all mode after removal
      fetchFavorites(); // Refresh favorites list
    } catch (error) {
      console.error("Error removing favorites:", error);
    }
  };

  useEffect(() => {
    getArtTools();
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [favoriteTools, isFocused]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "", light: "" }}
      hideHeader
    >
      <View className="mt-3">
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
            <TouchableOpacity onPress={() => setClearAllMode(!clearAllMode)}>
              <ThemedText>{clearAllMode ? "Cancel" : "Clear All"}</ThemedText>
            </TouchableOpacity>
            {clearMode ? (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <ThemedText>Clear</ThemedText>
              </TouchableOpacity>
            ) : null}

            {selectedItems && isModalVisible && (
              <TouchableOpacity onPress={removeSelectedFavorites}>
                <ThemedText>Remove Selected</ThemedText>
              </TouchableOpacity>
            )}
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
                        [item.id]: !prev[item.id],
                      }));
                    }}
                    onLongPress={() => {
                      setClearMode(true);
                      setSelectedItems((prev) => ({
                        ...prev,
                        [item.id]: true,
                      }));
                    }}
                    noCardWidth
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
