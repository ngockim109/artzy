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
import Loading from "@/components/Loading";
import LoadingSmall from "@/components/LoadingSmall";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { filterTools } from "@/utils/filterTools";

export default function HomeScreen() {
  const [tools, setTools] = useState<ITool[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDeal, setLoadingDeal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredTools, setFilteredTools] = useState(tools);
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
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
      originalTools: tools,
      price: filters.price,
      glassSurfaces: filters.glassSurface,
      onSale: filters.onSale,
    });

    setFilteredTools(filteredResults);
    const isDefaultFilter =
      filters.price === "Any price" &&
      filters.glassSurface === "All" &&
      filters.onSale === null;

    setAreFiltersApplied(!isDefaultFilter);
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
