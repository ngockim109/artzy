import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ITool from "@/interface/tool.interface";
import api from "@/api/api";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import LoadingSmall from "@/components/LoadingSmall";
import Empty from "@/components/Empty";
import Tools from "@/components/Tools";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchBar from "@/components/SearchBar";
import { filterTools } from "@/utils/filterTools";
import Filters from "@/components/Filters";

const search = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const [tools, setTools] = useState<ITool[]>([]);
  const [filteredTools, setFilteredTools] = useState(tools);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>(query || "");
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const router = useRouter();

  const searchTools = async () => {
    try {
      setLoading(true);
      setErrorText(null);
      setTools([]);
      const artNameRs = await api.get("/art-tools?artName=" + query);
      if (artNameRs.status === 200) {
        setTools(artNameRs.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.status === 404) {
        setErrorText("No products found! Please search other keywords!");
      }
    }
  };
  const onChangeSearchValue = (text: string) => setSearchValue(text);
  const handleSearch = () => {
    router.setParams({ query: searchValue });
  };

  useEffect(() => {
    searchTools();
  }, [query]);
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
      headerBackgroundColor={{ light: "", dark: "" }}
      hideHeader
    >
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerTitle: "",
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                  className="p-3 rounded-full"
                  style={{ backgroundColor: Colors.light.grayLight }}
                />
              </TouchableOpacity>
              <ThemedView style={{ width: "80%", marginLeft: 10 }}>
                <SearchBar
                  value={searchValue}
                  handleSearch={handleSearch}
                  onChangeText={onChangeSearchValue}
                />
              </ThemedView>
            </>
          ),
        }}
      ></Stack.Screen>
      {errorText !== "" && errorText !== null ? (
        <Empty
          title="No results found"
          description={errorText}
          icon="search1"
          buttonText="Try again"
          handlePress={() => {
            setErrorText(null);
            searchTools();
          }}
          noAction
        />
      ) : (
        <>
          <ThemedText
            type="subtitle"
            lightColor={Colors.light.subtitle}
            darkColor={Colors.dark.subtitle}
          >
            Products
          </ThemedText>
          {loading ? null : (
            <ThemedText
              type="blurText"
              lightColor={Colors.light.gray}
              darkColor={Colors.dark.gray}
              className="text-right"
            >
              Results:{" "}
              {areFiltersApplied ? filteredTools?.length : tools?.length}
              {areFiltersApplied
                ? tools?.length > 1
                  ? " products"
                  : " product"
                : tools?.length > 1
                ? " products"
                : " product"}
            </ThemedText>
          )}
          <Filters onFilterChange={applyFilters} />
          {loading ? (
            <LoadingSmall />
          ) : areFiltersApplied ? (
            filteredTools == null || filteredTools.length <= 0 ? (
              <Empty
                title="No results found"
                description="Something went wrong. Please try again!"
                icon="search1"
                buttonText="Try again"
                noAction
                handlePress={() => {
                  setErrorText(null);
                  searchTools();
                }}
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
              title="No results found"
              description="Something went wrong. Please try again!"
              icon="search1"
              buttonText="Try again"
              handlePress={() => {
                setErrorText(null);
                searchTools();
              }}
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
        </>
      )}
    </ParallaxScrollView>
  );
};

export default search;
