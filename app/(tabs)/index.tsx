import { View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import Brands from "@/components/Brands";
import { Colors } from "@/constants/Colors";
import Filters from "@/components/Filters";

import "@/styles/styles.css";
import api from "@/api/api";
import { useEffect, useMemo, useState } from "react";
import ITool from "@/interface/tool.interface";
import Tools from "@/components/Tools";
import Empty from "@/components/Empty";
import IBrand from "@/interface/brand.interface";
import LoadingSmall from "@/components/LoadingSmall";
import { filterTools } from "@/utils/filterTools";
import SortTools from "@/components/SortTools";
import { sortTools } from "@/utils/sortData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import SearchBarNotPage from "@/components/SearchBarNotPage";
import React from "react";

export default function HomeScreen() {
  const [tools, setTools] = useState<ITool[]>([]);
  const [originalTools, setOriginalTools] = useState<ITool[]>([]);
  const [searchedTools, setSearchedTools] = useState<ITool[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDeal, setLoadingDeal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [areSortApplied, setAreSortApplied] = useState(false);
  const [currentSortOption, setCurrentSortOption] =
    useState<string>("relevant");

  const [priceFilter, setPriceFilter] = useState<string>("Any price");
  const [glassSurfaceFilter, setGlassSurfaceFilter] = useState<
    "All" | "true" | "false"
  >("All");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [onSaleFilter, setOnSaleFilter] = useState<boolean | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

  const isFocused = useIsFocused();

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
  };
  const handleSearch = () => {
    if (searchValue.trim()) {
      const searchResults = tools.filter(
        (tool) =>
          tool.artName.toLowerCase().includes(searchValue.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchedTools(searchResults);
    }
    setIsSearch(false);
    setIsSearchMode(true);
  };

  const getArtTools = async () => {
    try {
      setLoading(true);
      setBrandLoading(true);
      const response = await api.get("art-tools");
      if (response.status == 200) {
        setTools(response.data);
        setOriginalTools(response.data);
        setLoading(false);
        const brandData = response.data.map((data: ITool) => ({
          id: data.brand,
          brand: data.brand,
          brandImage: data.brandImage,
        }));

        const uniqueBrandData = brandData.filter(
          (brandItem: IBrand, index: number, self: ITool[]) =>
            index === self.findIndex((b) => b.brand === brandItem.brand)
        );
        setBrands(uniqueBrandData);
        setBrandLoading(false);
      } else {
        console.error("Error fetching art tools.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const applyFilters = (filters) => {
    setPriceFilter(filters.price);
    setGlassSurfaceFilter(filters.glassSurface);
    setOnSaleFilter(filters.onSale);
    setBrandFilter(filters.brandFilter);
    const isDefaultFilter =
      filters.price === "Any price" &&
      filters.glassSurface === "All" &&
      filters.onSale === null &&
      filters.brandFilter === "All";

    setAreFiltersApplied(!isDefaultFilter);
    if (isDefaultFilter) {
      setPriceFilter("Any price");
      setGlassSurfaceFilter("All");
      setOnSaleFilter(null);
      setBrandFilter("All");
    }
  };

  const handleSortChange = (sortOption: string) => {
    setCurrentSortOption(sortOption);
    if (sortOption === "relevant") {
      setAreSortApplied(false);
    } else {
      setAreSortApplied(true);
    }
  };
  const resetFilters = () => {
    setPriceFilter("Any price");
    setGlassSurfaceFilter("All");
    setOnSaleFilter(null);
    setAreFiltersApplied(false);
    setBrandFilter("All");
    // setTools(originalTools);
  };
  const resetSorting = () => {
    setCurrentSortOption("relevant");
    setAreSortApplied(false);
    setTools(originalTools);
  };

  const resetSearch = () => {
    setSearchValue("");
    setIsSearch(false);
  };

  const loadFavoriteIds = async () => {
    const storedFavorites = await AsyncStorage.getItem("favorites");
    if (storedFavorites) {
      setFavoriteIds(JSON.parse(storedFavorites));
    }
  };

  const renderData = useMemo(() => {
    let dataToRender: ITool[];
    // original data
    if (
      searchValue?.trim().length <= 0 &&
      !areFiltersApplied &&
      !areSortApplied
    ) {
      dataToRender = tools;
    } else if (searchValue?.trim().length > 0) {
      // render when search is applied
      dataToRender = searchedTools;
      if (areFiltersApplied) {
        dataToRender = filterTools({
          originalTools: searchedTools,
          price: priceFilter,
          glassSurfaces: glassSurfaceFilter,
          onSale: onSaleFilter,
          brandFilter: brandFilter,
        });
      }
      if (areSortApplied) {
        dataToRender = sortTools(dataToRender, currentSortOption);
      }
    } else {
      // when search is not applied
      dataToRender = tools;
      if (areFiltersApplied) {
        dataToRender = filterTools({
          originalTools: tools,
          price: priceFilter,
          glassSurfaces: glassSurfaceFilter,
          onSale: onSaleFilter,
          brandFilter: brandFilter,
        });
      }
      if (areSortApplied) {
        dataToRender = sortTools(dataToRender, currentSortOption);
      }
    }
    return dataToRender;
  }, [
    isSearchMode,
    areFiltersApplied,
    areSortApplied,
    tools,
    searchedTools,
    priceFilter,
    glassSurfaceFilter,
    brandFilter,
    onSaleFilter,
    currentSortOption,
  ]);

  useEffect(() => {
    getArtTools();
    loadFavoriteIds();
    resetFilters();
    resetSearch();
    resetSorting();
  }, [isFocused]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "", light: "" }}
      hideHeader
    >
      <View className="mt-3" style={{ position: "relative", zIndex: 100 }}>
        <SearchBarNotPage
          value={searchValue}
          onChangeText={onChangeSearchValue}
          handleSearch={handleSearch}
          isSearch={isSearch}
          clearSearchValue={clearSearchValue}
        />
      </View>
      <ThemedText
        type="subtitle"
        lightColor={Colors.light.subtitle}
        darkColor={Colors.dark.subtitle}
      >
        Brands
      </ThemedText>

      {brandLoading ? (
        <LoadingSmall />
      ) : brands === null || brands.length <= 0 ? null : (
        <Brands DATA={brands} />
      )}
      <ThemedText
        type="subtitle"
        lightColor={Colors.light.subtitle}
        darkColor={Colors.dark.subtitle}
      >
        Products
      </ThemedText>
      <Filters onFilterChange={applyFilters} brands={brands} />
      <SortTools onSortChange={handleSortChange} />
      {loading ? (
        <LoadingSmall />
      ) : renderData == null || renderData?.length <= 0 ? (
        <Empty
          icon="frown"
          description="No products here!"
          title="Empty"
          noAction
        />
      ) : (
        <>
          <ThemedText
            className="text-right"
            type="blurText"
            lightColor={Colors.light.gray}
            darkColor={Colors.dark.gray}
          >
            Showing {renderData.length} data
          </ThemedText>
          <Tools toolData={renderData} />
        </>
      )}
    </ParallaxScrollView>
  );
}
