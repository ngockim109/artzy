import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FavoriteIcon from "@/components/atoms/FavoriteIcon";
import { useTheme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import api from "@/api/api";
import { ThemedText } from "@/components/ThemedText";
import ITool from "@/interface/tool.interface";
import Loading from "@/components/Loading";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import PreviewFeedback from "@/components/PreviewFeedback";
import { ThemedView } from "@/components/ThemedView";
import IFeedback from "@/interface/feedback.interface";
import { averageRating } from "@/utils/averageRating";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import CommonBadge from "@/components/atoms/CommonBadge";
import { calculatePrice } from "@/utils/calculatePrice";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const ToolDetail = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme() ?? "light";
  const [tool, setTool] = useState<ITool>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getTool = async () => {
    try {
      setLoading(true);
      const response = await api.get("/art-tools/" + id);
      if (response.status === 200) {
        setTool(response.data);
        setLoading(false);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTool();
  }, [id]);
  return loading ? (
    <Loading />
  ) : (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "", dark: "" }}
      hideHeader
    >
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
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
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <View
                className="rounded-full p-3"
                style={{ backgroundColor: Colors.light.grayLight }}
              >
                <FavoriteIcon
                  favorite
                  color={theme ? Colors.light.highlight : Colors.dark.highlight}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
      <View className="w-full py-3 bg-white">
        <Image
          source={{ uri: tool?.image }}
          className="w-full"
          resizeMode="contain"
          style={{ height: 300 }}
        ></Image>
      </View>

      <View className="my-3">
        <View>
          <View className="flex-row mr-4">
            <ThemedText type="subtitle">
              ${calculatePrice(tool?.limitedTimeDeal ?? 0, tool?.price ?? 0)}
            </ThemedText>
            {tool?.limitedTimeDeal && tool?.limitedTimeDeal > 0 ? (
              <ThemedText type="remove" className="ml-2">
                ${tool?.price}
              </ThemedText>
            ) : null}
          </View>
          {tool?.limitedTimeDeal && tool?.limitedTimeDeal > 0 ? (
            <View className="flex-row gap-3">
              <ThemedText
                type="blurText"
                lightColor={Colors.light.gray}
                darkColor={Colors.dark.gray}
              >
                You save: ${tool?.price * tool?.limitedTimeDeal}
              </ThemedText>
              <ThemedText
                type="subtitle"
                lightColor={Colors.light.highlight}
                darkColor={Colors.dark.highlight}
              >
                -{tool?.limitedTimeDeal * 100}%
              </ThemedText>
              {tool?.limitedTimeDeal && tool?.limitedTimeDeal > 0 && (
                <View className="w-28 my-1 items-center">
                  <CommonBadge text="Limited time deal" status="highlight" />
                </View>
              )}
            </View>
          ) : null}
        </View>

        {tool && (
          <View className="flex-row gap-1">
            <ThemedText type="subtext">
              {averageRating(tool?.feedbacks)}
            </ThemedText>
            <StarRatingDisplay
              rating={averageRating(tool?.feedbacks)}
              starSize={16}
              style={{ alignItems: "center" }}
              starStyle={{ marginRight: 0, marginLeft: 0 }}
            />
            <ThemedText className="text-slate-300" type="subtext">
              ({tool?.feedbacks?.length ?? 0})
            </ThemedText>
          </View>
        )}

        {tool?.glassSurface && (
          <View
            className="w-24
           my-1 items-center"
          >
            <CommonBadge text="Glass surface" status="glassSurface" />
          </View>
        )}
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text}>
          {tool?.artName}
        </ThemedText>

        <ThemedView
          className="border-b py-3"
          style={{
            borderColor: theme ? Colors.light.slate : Colors.dark.slate,
          }}
        >
          <ThemedText type="subtitle">Description</ThemedText>
          <ThemedText type="default" className="mt-2">
            {tool?.description}
          </ThemedText>
        </ThemedView>

        <ThemedView
          className="py-3 border-b"
          style={{
            borderColor: theme ? Colors.light.slate : Colors.dark.slate,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/brands/[id]`,
                params: { id: tool?.brand ?? "", brandImage: tool?.brandImage },
              })
            }
          >
            <ThemedView className="flex-row justify-between items-center">
              <ThemedView className="flex-row gap-2 items-center">
                <Image
                  source={{ uri: tool?.brandImage }}
                  className="rounded-full"
                  resizeMode="contain"
                  style={{ height: 40, width: 40 }}
                ></Image>
                <ThemedText type="defaultSemiBold">{tool?.brand}</ThemedText>
              </ThemedView>
              <AntDesign name="right" size={16} color="black" />
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView className="my-3">
          <TouchableOpacity
            onPress={() => router.push(`/tools/[${toolId}]/feedbacks`)}
          >
            <ThemedText type="subtitle">Customer Reviews</ThemedText>
          </TouchableOpacity>
          {tool?.feedbacks && tool?.feedbacks?.length > 0 ? (
            <PreviewFeedback feedbacks={tool?.feedbacks} toolId={tool?.id} />
          ) : (
            <ThemedView>
              <ThemedText>
                There are no feedbacks. Shopping to be the first comment now.
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
};

export default ToolDetail;
