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

const search = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const [tools, setTools] = useState<ITool[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const router = useRouter();

  const searchTools = async () => {
    try {
      setLoading(true);
      setErrorText(null);
      const artNameRs = await api.get("/art-tools?artName=" + query);
      if (artNameRs.status === 200) {
        setTools(artNameRs.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.status === 404) {
        setErrorText("No products found!");
      }
    }
  };

  useEffect(() => {
    searchTools();
  }, [query]);

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
                <SearchBar />
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
        />
      ) : (
        <>
          <ThemedText
            type="subtitle"
            lightColor={Colors.light.subtitle}
            darkColor={Colors.dark.subtitle}
          >
            All products
          </ThemedText>
          {loading ? null : (
            <ThemedText
              type="blurText"
              lightColor={Colors.light.gray}
              darkColor={Colors.dark.gray}
              className="text-right"
            >
              Results: {tools?.length}
              {tools?.length > 1 ? " products" : " product"}
            </ThemedText>
          )}

          {loading ? (
            <LoadingSmall />
          ) : tools?.length > 0 ? (
            <ThemedView>
              <Tools toolData={tools} />
            </ThemedView>
          ) : (
            <Empty
              title="No results found"
              description="Something went wrong. Please try again!"
              icon="search1"
              buttonText="Try again"
              handlePress={() => {
                setErrorText(null);
                searchTools();
              }}
            />
          )}
        </>
      )}
    </ParallaxScrollView>
  );
};

export default search;
