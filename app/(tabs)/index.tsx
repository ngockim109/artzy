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

export default function HomeScreen() {
  const [tools, setTools] = useState<ITool[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDeal, setLoadingDeal] = useState<boolean>(false);
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
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "", light: "" }}
      hideHeader
    >
      <SearchBar />
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
      <Filters />
      {loading ? (
        <LoadingSmall />
      ) : tools == null || tools.length <= 0 ? (
        <Empty
          icon="frown"
          description="Shop now is empty! Come back!"
          title="Empty"
          noAction
        />
      ) : (
        <Tools toolData={tools} />
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
