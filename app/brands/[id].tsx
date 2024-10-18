import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import ITool from "@/interface/tool.interface";
import api from "@/api/api";
import { Colors } from "@/constants/Colors";

const Brands = () => {
  const { id, brandImage } = useLocalSearchParams();
  const [tools, setTools] = useState<ITool[]>();
  const [loading, setLoading] = useState(false);

  const getTools = async () => {
    try {
      setLoading(true);
      const response = await api.get("/art-tools?brand=" + id);
      if (response.status === 200) {
        setTools(response.data);
        setLoading(false);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTools();
  }, [id]);
  return (
    <ThemedView>
      <ThemedView className="flex-row gap-2 items-center px-3 py-4">
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
    </ThemedView>
  );
};

export default Brands;
