import { View, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import CommonBadge from "@/components/atoms/CommonBadge";
import { Colors } from "@/constants/Colors";
import FavoriteIcon from "../atoms/FavoriteIcon";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { useNotification } from "../atoms/NotificationContext";
import CustomCheckbox from "../atoms/CustomCheckBox";

type ToolsProps = {
  source: string;
  toolName: string;
  price: number;
  rating: number;
  numberOfRating: number;
  oldPrice: number;
  deal: number;
  glassSurface: boolean;
  noCardWidth?: boolean;
  id: string;
  isChecked?: boolean;
  isShowCheckBox?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
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
  glassSurface,
  noCardWidth = false,
  isChecked = false,
  onPress,
  onLongPress,
  isShowCheckBox = false,
}: ToolsProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { showNotification } = useNotification();
  useEffect(() => {
    loadFavorite();
  }, [setIsFavorite]);
  useEffect(() => {
    loadFavorite();
    console.log(isFavorite, id);
  }, [isFavorite]);
  const loadFavorite = async () => {
    try {
      const favoriteItems = await AsyncStorage.getItem("favorites");
      console.log(favoriteItems);
      if (favoriteItems) {
        const favoriteItemsArray = JSON.parse(favoriteItems);
        setIsFavorite(favoriteItemsArray.includes(id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoritePress = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let updatedFavorites = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = updatedFavorites.filter(
          (item: string) => item !== id
        );
        showNotification(`Item removed successfully from favorites!`);
      } else {
        // Add to favorites
        updatedFavorites.push(id);
        showNotification(`Item added successfully to favorites!`);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <View
        style={[styles.card, !noCardWidth && styles.cardWidth]}
        className="mb-5 rounded-md z-10"
        pointerEvents="box-none"
      >
        <View style={styles.favoriteContainer}>
          <FavoriteIcon
            favorite={isFavorite}
            color={Colors.light.highlight}
            style={{ backgroundColor: Colors.light.grayLight }}
            className="absolute right-1 top-1 rounded-full p-2 w-9 h-9"
            onPress={handleFavoritePress}
          />
        </View>
        {isShowCheckBox ? (
          <Pressable onPress={onPress} style={styles.checkboxContainer}>
            <View style={[styles.checkbox, isChecked && styles.checked]}>
              {isChecked && <View style={styles.checkmark} />}
            </View>
          </Pressable>
        ) : null}

        <Pressable
          onLongPress={onLongPress}
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
              <ThemedText
                lightColor={Colors.light.textCard}
                darkColor={Colors.dark.textCard}
                numberOfLines={2}
              >
                {toolName}
              </ThemedText>
              <View className="flex-row">
                <ThemedText
                  type="subtext"
                  lightColor={Colors.light.textCard}
                  darkColor={Colors.dark.textCard}
                >
                  {rating}
                </ThemedText>
                <StarRatingDisplay
                  rating={rating}
                  starSize={16}
                  style={{ alignItems: "center" }}
                  starStyle={{ marginRight: 0, marginLeft: 0 }}
                />
                <ThemedText
                  className="text-slate-300"
                  type="subtext"
                  lightColor={Colors.light.textCard}
                  darkColor={Colors.dark.textCard}
                >
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
                  <ThemedText
                    type="subtitle"
                    lightColor={Colors.light.textCard}
                    darkColor={Colors.dark.textCard}
                  >
                    ${price}
                  </ThemedText>
                  {deal > 0 && (
                    <ThemedText
                      type="remove"
                      className="ml-2"
                      lightColor={Colors.light.textCard}
                      darkColor={Colors.dark.textCard}
                    >
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
              <View className="w-28 my-1">
                <CommonBadge
                  text={`${
                    glassSurface ? "Glass Surface" : "No Glass Surface"
                  }`}
                  status={`${glassSurface ? "glassSurface" : "noGlassSurface"}`}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  card: {
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 10,
    marginVertical: 10,
  },
  cardWidth: {
    width: "48%",
  },
  cardContent: {
    paddingHorizontal: 10,
  },
  notification: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: Colors.light.highlight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 10,
  },
  notificationLink: {
    color: "white",
    marginTop: 5,
  },
  favoriteContainer: {
    zIndex: 100,
  },
  checkboxContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 100,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.light.primary,
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "white",
  },
});
export default ToolCard;
