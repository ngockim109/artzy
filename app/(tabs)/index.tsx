import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SearchBar from "@/components/SearchBar";
import Brands from "@/components/Brands";
import Categories from "@/components/Categories";
import { Colors } from "@/constants/Colors";
import Filters from "@/components/Filters";

import "@/styles/styles.css";
import api from "@/api/api";
import { useEffect, useState } from "react";
import ITool from "@/interface/tool.interface";
import Tools from "@/components/Tools";
import Empty from "@/components/Empty";
import IBrand from "@/interface/brand.interface";
import LoadingSmall from "@/components/LoadingSmall";
import { useRouter } from "expo-router";
import { filterTools } from "@/utils/filterTools";
import SortTools from "@/components/SortTools";
import { sortTools } from "@/utils/sortData";

export default function HomeScreen() {
  const [tools, setTools] = useState<ITool[]>([]);
  const [originalTools, setOriginalTools] = useState<ITool[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

  const router = useRouter();
  const onChangeSearchValue = (text: string) => setSearchValue(text);
  const handleSearch = () => {
    // Only navigate if not already on the search screen
    router.push({ pathname: "/search", params: { query: searchValue } });
    setSearchValue("");
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
        const brandData = response.data.map((data) => ({
          id: data.brand,
          brand: data.brand,
          brandImage: data.brandImage,
        }));

        const uniqueBrandData = brandData.filter(
          (brandItem: IBrand, index, self) =>
            index === self.findIndex((b) => b.brand === brandItem.brand)
        );
        setBrands(uniqueBrandData);
        setBrandLoading(false);
      } else {
        console.error("Error fetching art tools: ", error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArtTools();
  }, []);
  const applyFilters = (filters) => {
    const filteredResults = filterTools({
      originalTools: originalTools,
      price: filters.price,
      glassSurfaces: filters.glassSurface,
      onSale: filters.onSale,
    });

    setPriceFilter(filters.price);
    setGlassSurfaceFilter(filters.glassSurface);
    setOnSaleFilter(filters.onSale);

    const isDefaultFilter =
      filters.price === "Any price" &&
      filters.glassSurface === "All" &&
      filters.onSale === null;

    setAreFiltersApplied(!isDefaultFilter);
    console.log(areSortApplied + "sort");
    if (isDefaultFilter) {
      setPriceFilter("Any price");
      setGlassSurfaceFilter("All");
      setOnSaleFilter(null);
    }
    if (areSortApplied) {
      if (isDefaultFilter) {
        const filteredResults = filterTools({
          originalTools: originalTools,
          price: "Any price",
          glassSurfaces: "All",
          onSale: null,
        });
        setFilteredTools(filteredResults);
      } else {
        const sortedFilteredResults = sortTools(
          filteredResults,
          currentSortOption
        );
        setFilteredTools(sortedFilteredResults);
      }
    } else {
      setFilteredTools(filteredResults);
    }
  };

  const handleSortChange = (sortOption) => {
    setCurrentSortOption(sortOption);
    if (sortOption === "relevant") {
      setAreSortApplied(false);

      // Reset tools to original data
      const filteredResults = filterTools({
        originalTools: originalTools,
        price: priceFilter,
        glassSurfaces: glassSurfaceFilter,
        onSale: onSaleFilter,
      });
      if (areFiltersApplied) {
        setFilteredTools(filteredResults);
      } else {
        setTools(originalTools);
      }
    } else {
      setAreSortApplied(true);

      const toolsToSort = areFiltersApplied ? filteredTools : tools;
      const sortedTools = sortTools(toolsToSort, sortOption);
      console.log(areFiltersApplied);
      if (areFiltersApplied) {
        setFilteredTools(sortedTools);
      } else {
        setTools(sortedTools);
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "", light: "" }}
      hideHeader
    >
      <SearchBar
        value={searchValue}
        onChangeText={onChangeSearchValue}
        handleSearch={handleSearch}
      />
      <ThemedText
        type="subtitle"
        lightColor={Colors.light.subtitle}
        darkColor={Colors.dark.subtitle}
      >
        All brands
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
        All products
      </ThemedText>
      <Filters onFilterChange={applyFilters} />
      <SortTools onSortChange={handleSortChange} />
      {loading ? (
        <LoadingSmall />
      ) : areFiltersApplied ? (
        filteredTools == null || filteredTools.length <= 0 ? (
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
              Showing {filteredTools.length} data
            </ThemedText>
            <Tools toolData={filteredTools} />
          </>
        )
      ) : tools == null || tools.length <= 0 ? (
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
            Showing all {tools.length} data
          </ThemedText>
          <Tools toolData={tools} />
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
