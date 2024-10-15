import { Image, StyleSheet, Platform, View, Text } from "react-native";

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

export default function HomeScreen() {
  const [tools, setTools] = useState<ITool[]>();
  const DATA = [
    {
      id: "1",
      brand: "jdgfjhd",
      brandImage:
        "https://i.pinimg.com/236x/1f/3b/53/1f3b53271bae57b57230e9061ede1191.jpg",
    },
    {
      id: "2",
      brand: "jdgfjhd",
      brandImage:
        "https://i.pinimg.com/236x/1f/3b/53/1f3b53271bae57b57230e9061ede1191.jpg",
    },
    {
      id: "3",
      brand: "jdgfjhd",
      brandImage:
        "https://i.pinimg.com/236x/1f/3b/53/1f3b53271bae57b57230e9061ede1191.jpg",
    },
    {
      id: "4",
      brand: "jdgfjhd",
      brandImage:
        "https://i.pinimg.com/236x/1f/3b/53/1f3b53271bae57b57230e9061ede1191.jpg",
    },
    {
      id: "5",
      brand: "jdgfjhd",
      brandImage:
        "https://i.pinimg.com/236x/1f/3b/53/1f3b53271bae57b57230e9061ede1191.jpg",
    },
    {
      id: "6",
      brand: "jdgfjhd",
      brandImage:
        "https://i.pinimg.com/236x/1f/3b/53/1f3b53271bae57b57230e9061ede1191.jpg",
    },
  ];

  const getArtTools = async () => {
    try {
      const response = await api.get("art-tools");
      console.log(response.data);
      if(response.status == 200) {
        setTools(response.data)
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
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "", light: "" }}
      hideHeader
    >
      <SearchBar value="" onChangeText={() => {}} />
      <ThemedText
        type="subtitle"
        lightColor={Colors.light.subtitle}
        darkColor={Colors.dark.subtitle}
      >
        All brands
      </ThemedText>
      <Brands DATA={DATA} />
      <Filters />
      <ThemedText
        type="subtitle"
        lightColor={Colors.light.subtitle}
        darkColor={Colors.dark.subtitle}
      >
        All products
      </ThemedText>
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
