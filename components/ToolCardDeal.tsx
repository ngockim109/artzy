import { View, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CommonBadge from "@/components/atoms/CommonBadge";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

type ToolsProps = {
  source: string;
  price: number;
  oldPrice: number;
  deal: number;
  noCardWidth?: boolean;
  id: string;
};
const ToolCardDeal = ({
  source,
  price,
  oldPrice,
  deal,
  id,
  noCardWidth = false,
}: ToolsProps) => {
  return (
    <>
      <View
        style={[styles.card, !noCardWidth && styles.cardWidth]}
        className="mb-5 rounded-md z-10"
        pointerEvents="box-none"
      >
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
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.light.background,
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 9999,
    backgroundColor: Colors.light.primary,
  },
});
export default ToolCardDeal;
