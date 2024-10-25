import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  TextInput,
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import SearchBarNotPage from "@/components/SearchBarNotPage";

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
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const bottomSheetModalRemoveRef = useRef<BottomSheetModal>(null);

  const toggleModalVisibility = () => {
    if (isModalVisible) {
      bottomSheetModalRemoveRef.current?.close(); // Close modal if it's visible
    } else {
      bottomSheetModalRemoveRef.current?.present(); // Open modal if it's not visible
    }
    setIsModalVisible(!isModalVisible); // Toggle the state
  };
  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.9}
        onPress={() => bottomSheetModalRemoveRef.current?.close()}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const getArtTools = async () => {
    try {
      const response = await api.get("art-tools");
      if (response.status == 200) {
        setTools(response.data);
        setOriginalTools(response.data);
      } else {
        console.error("Error fetching art tools!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true);
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
      setIsModalVisible(false);
      bottomSheetModalRemoveRef.current?.close();
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
    clearSearchValue();
    setIsCheckBoxShow(false);
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    fetchFavorites();
  };
  useEffect(() => {
    setSelectedItems({});
    clearSearchValue();
    setIsCheckBoxShow(false);
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    fetchFavorites();
  }, [isFocused]);
  useEffect(() => {
    const selectedCount = getSelectedItemCount(selectedItems);

    // If no items are selected, disable clear all mode
    if (selectedCount === 0 && clearAllMode) {
      setClearAllMode(false);
    }
  }, [selectedItems]);
  const snapPoints = useMemo(() => ["25%"], []);
  const handleModalDismiss = () => {
    bottomSheetModalRemoveRef.current?.close();
    // clearDeleteFields();
    setIsModalVisible(false);
  };

  // handle search
  const onChangeSearchValue = (text: string) => {
    setSearchValue(text);
    if (text.trim().length > 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };
  const clearSearchValue = () => {
    setSearchValue("");
    setIsSearch(false);
    setIsSearchMode(false);
    setIsClearMode(false);
  };
  const handleSearch = () => {
    if (searchValue.trim()) {
      const searchResults = favoriteTools.filter(
        (tool) =>
          tool.artName.toLowerCase().includes(searchValue.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFavoriteTools(searchResults);
    }
    setIsSearch(false);
    setIsSearchMode(true);
  };

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
        <View className="mt-3" style={{ position: "relative", zIndex: 100 }}>
          <SearchBarNotPage
            value={searchValue}
            onChangeText={onChangeSearchValue}
            handleSearch={handleSearch}
            isSearch={isSearch}
            clearSearchValue={clearSearchValue}
          />
        </View>
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
                <TouchableOpacity
                  onPress={toggleModalVisibility}
                  disabled={
                    getSelectedItemCount(selectedItems) <= 0 ? true : false
                  }
                >
                  <FontAwesome5
                    name="trash"
                    size={24}
                    color={
                      getSelectedItemCount(selectedItems) <= 0
                        ? Colors.light.gray
                        : Colors.light.primary
                    }
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
                      setIsClearMode(true);
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
      <BottomSheetModal
        ref={bottomSheetModalRemoveRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={handleModalDismiss}
        backdropComponent={renderBackdrop}
      >
        <TouchableWithoutFeedback onPress={handleModalDismiss}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <BottomSheetView style={styles.contentContainer}>
          <ThemedText
            type="subtitle"
            className="mb-2"
            lightColor={Colors.light.textCard}
            darkColor={Colors.dark.textCard}
          >
            Confirm remove
          </ThemedText>

          <ThemedView
            className="flex-row gap-2 mt-2"
            darkColor={Colors.dark.bottomSheetBg}
            lightColor={Colors.light.bottomSheetBg}
          >
            <ThemedText
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              Remove {getSelectedItemCount(selectedItems)} items from favorites
              list. You can add them to favorites list again!
            </ThemedText>
          </ThemedView>
          <ThemedView className="flex-row gap-4 w-full px-5 justify-center">
            <TouchableOpacity onPress={handleModalDismiss}>
              <ThemedView
                lightColor={Colors.light.background}
                darkColor={Colors.dark.background}
                className="w-full rounded-full p-2 mt-3"
              >
                <ThemedText
                  type="defaultSemiBold"
                  lightColor={Colors.light.buttonOutlineText}
                  darkColor={Colors.dark.buttonOutlineText}
                  className="text-center"
                >
                  Cancel
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeSelectedFavorites}>
              <ThemedView
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
                className="w-full rounded-full p-2 mt-3"
              >
                <ThemedText
                  type="defaultSemiBold"
                  lightColor={Colors.light.buttonPrimaryText}
                  darkColor={Colors.dark.buttonPrimaryText}
                  className="text-center px-2"
                >
                  Remove
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
        </BottomSheetView>
      </BottomSheetModal>
    </ParallaxScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    zIndex: 1,
  },
});
export default Favorites;
