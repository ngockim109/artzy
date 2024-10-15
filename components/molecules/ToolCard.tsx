import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CommonBadge from "@/components/atoms/CommonBadge";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

type ToolsProps = {
  source: string;
  toolName: string;
  price: number;
  rating: number;
  numberOfRating: number;
  oldPrice: number;
  deal: number;
  id: string;
};
const ToolCard = ({
  source,
  toolName,
  price,
  rating,
  numberOfRating,
  oldPrice,
  deal,
  id,
}: ToolsProps) => {
  return (
    <View className="flex-1 m-5 p-5 rounded-md bg-white">
      <View className="relative">
        <Image
          style={styles.image}
          source={{ uri: source }}
          resizeMode="contain"
        />
        <MaterialIcons name="favorite-border" size={20} color="black" />
        <MaterialIcons name="favorite" size={20} color="black" />
      </View>
      <ThemedText type="subtext">{toolName}</ThemedText>
      <ThemedText>{rating}</ThemedText>
      <ThemedText>{numberOfRating}</ThemedText>
      <ThemedText>{price}</ThemedText>
      <ThemedText>{oldPrice}</ThemedText>
      {deal >= 0 && (
        <ThemedText
          type="defaultSemiBold"
          lightColor={Colors.light.highlight}
          darkColor={Colors.dark.highlight}
        >
          -{deal}%
        </ThemedText>
      )}
      <CommonBadge text="Limited time deal" status="highlight" />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
});
export default ToolCard;
