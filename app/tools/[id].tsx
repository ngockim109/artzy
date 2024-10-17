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
    <ThemedSafeAreaView>
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

      <View className="px-3 my-3">
        <ThemedText lightColor={Colors.light.text} darkColor={Colors.dark.text}>
          {tool?.artName}
        </ThemedText>
      </View>
      <ThemedText type="subtitle">Customer Reviews</ThemedText>
      {tool?.feedbacks && tool?.feedbacks?.length > 0 ? (
        <PreviewFeedback feedbacks={tool?.feedbacks} />
      ) : (
        <ThemedView>
          <ThemedText>
            There are no feedbacks. Shopping to be the first comment now.
          </ThemedText>
        </ThemedView>
      )}
    </ThemedSafeAreaView>
  );
};

export default ToolDetail;
