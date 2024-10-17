import { View, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CommonBadge from "@/components/atoms/CommonBadge";
import { Colors } from "@/constants/Colors";
import FavoriteIcon from "../atoms/FavoriteIcon";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Link, router } from "expo-router";

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
    <View style={styles.card} className="mb-5 rounded-md relative">
      <FavoriteIcon
        favorite={false}
        color={Colors.light.highlight}
        style={{ backgroundColor: Colors.light.grayLight }}
        className="absolute right-1 top-1 rounded-full p-2"
      />
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/tools/[id]",
            params: { id: id },
          })
        }
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: source }}
            resizeMode="contain"
          />
          <View style={styles.cardContent}>
            <ThemedText>{toolName}</ThemedText>
            <View className="flex-row">
              <ThemedText type="subtext">{rating}</ThemedText>
              <StarRatingDisplay
                rating={rating}
                starSize={16}
                style={{ alignItems: "center" }}
                starStyle={{ marginRight: 0, marginLeft: 0 }}
              />
              <ThemedText className="text-slate-300" type="subtext">
                ({numberOfRating})
              </ThemedText>
            </View>
            {deal > 0 && (
              <View className="w-28 my-1">
                <CommonBadge text="Limited time deal" status="highlight" />
              </View>
            )}
            <View className="flex-row justify-between">
              <View className="flex-row ">
                <ThemedText type="subtitle">${price}</ThemedText>
                {deal > 0 && (
                  <ThemedText type="remove" className="ml-2">
                    ${oldPrice}
                  </ThemedText>
                )}
              </View>

              {deal > 0 && (
                <View>
                  <ThemedText
                    type="highlight"
                    lightColor={Colors.light.highlight}
                    darkColor={Colors.dark.highlight}
                  >
                    -{deal * 100}%
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  card: {
    width: "48%",
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 10,
    marginVertical: 10,
  },
  cardContent: {
    paddingHorizontal: 10,
  },
});
export default ToolCard;
