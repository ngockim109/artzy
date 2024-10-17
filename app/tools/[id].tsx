import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FavoriteIcon from "@/components/atoms/FavoriteIcon";
import { useTheme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import api from "@/api/api";

const ToolDetail = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme() ?? "light";
  const [tool, setTool] = React.useState(null);

  const router = useRouter();

  const getTool = async () => {
    try {
      const response = await api.get("/art-tools/" + id);
      setTool(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getTool();
  }, [id]);
  return (
    <>
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
                className="p-3 rounded-full bg-white"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <View className="bg-white rounded-full p-3">
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
    </>
  );
};

export default ToolDetail;
