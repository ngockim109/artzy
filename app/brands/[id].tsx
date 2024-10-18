import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ITool from "@/interface/tool.interface";
import api from "@/api/api";
import { Colors } from "@/constants/Colors";
import ToolCard from "@/components/molecules/ToolCard";
import LoadingSmall from "@/components/LoadingSmall";
import Empty from "@/components/Empty";
import Tools from "@/components/Tools";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import LimitedTimeDealProducts from "@/components/LimitedTimeDeal";

const Brands = () => {
  const { id, brandImage } = useLocalSearchParams();
  const [tools, setTools] = useState<ITool[]>([]);
  const [toolsDeal, setToolsDeal] = useState<ITool[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDeal, setLoadingDeal] = useState(false);
  const router = useRouter();

  const getTools = async () => {
    try {
      setLoading(true);
      setLoadingDeal(true);
      const response = await api.get("/art-tools?brand=" + id);
      if (response.status === 200) {
        setTools(response.data);
        setLoading(false);
        const toolsDealData = response.data.filter(
          (data: ITool) => data.limitedTimeDeal > 0
        );
        setToolsDeal(toolsDealData);
        setLoadingDeal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTools();
  }, [id]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "", dark: "" }}
      hideHeader
    >
      <Stack.Screen
        options={{
          headerTransparent: true,
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
              <ThemedView className="flex-row gap-2 items-center px-2">
                {brandImage && typeof brandImage === "string" ? (
                  <Image
                    source={{ uri: brandImage }}
                    className="rounded-full"
                    resizeMode="contain"
                    style={{ height: 40, width: 40 }}
                  ></Image>
                ) : (
                  <ThemedView
                    className="rounded-full w-10 h-10 items-center align-middle justify-center"
                    lightColor={Colors.light.primary}
                    darkColor={Colors.dark.primary}
                  >
                    <ThemedText>{id.at(0)}</ThemedText>
                  </ThemedView>
                )}

                <ThemedText type="defaultSemiBold">{id}</ThemedText>
              </ThemedView>
            </>
          ),
        }}
      ></Stack.Screen>

      {loadingDeal ? null : (
        <ThemedView className="mt-28">
          <ThemedText
            type="subtitle"
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          >
            Limited Time Deal
          </ThemedText>
          <LimitedTimeDealProducts toolData={toolsDeal} />
        </ThemedView>
      )}

      {loading ? (
        <LoadingSmall />
      ) : tools?.length > 0 ? (
        <ThemedView className="mt-3">
          <ThemedText
            type="subtitle"
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          >
            Brand Products
          </ThemedText>
          <ThemedText className="text-right" type="blurText">
            {tools?.length} {tools?.length > 1 ? "products" : "product"}
          </ThemedText>
          <Tools toolData={tools} />
        </ThemedView>
      ) : (
        <Empty />
      )}
    </ParallaxScrollView>
  );
};

export default Brands;
