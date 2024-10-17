import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CommonBadge from "@/components/atoms/CommonBadge";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ITool from "@/interface/tool.interface";
import ToolCard from "@/components/molecules/ToolCard";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { roundNumber } from "@/utils/roundNumber";

type IToolCard = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  sale: number;
  rating: number;
  numberOfRating: number;
  deal: number;
};
type ToolsProps = {
  toolData: ArrayLike<ITool>;
};
const Tools = ({ toolData }: ToolsProps) => {
  return (
    // <FlatList
    //   data={toolData}
    //   numColumns={2}
    //   columnWrapperStyle={styles.row}
    //   showsHorizontalScrollIndicator={false}
    //   renderItem={({ item }) => (
    //     <ToolCard
    //       deal={item?.limitedTimeDeal}
    //       numberOfRating={numberOfRating}
    //       oldPrice={item?.price}
    //       price={item?.limitedTimeDeal >= 0 ? salePrice : item?.price}
    //       rating={rating}
    //       source={item?.image}
    //       toolName={item?.artName}
    //       key={item?.id}
    //       id={item?.id}
    //     />
    //   )}
    //   keyExtractor={(item) => item?.id}
    // />
    <ThemedView
      className="flex-row flex-wrap justify-between"
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      {toolData?.map((item: ITool) => {
        let rating = 0;
        let numberOfRating = item?.feedbacks?.length || 0;
        let price =
          item?.limitedTimeDeal > 0
            ? roundNumber(item?.price - item?.price * item?.limitedTimeDeal, 2)
            : item?.price;
        let sumRating = 0;
        item?.feedbacks &&
          item?.feedbacks.length > 0 &&
          item?.feedbacks?.forEach((fb) => {
            sumRating += fb.rating;
          });
        rating = roundNumber(sumRating / numberOfRating, 2);
        return (
          <ToolCard
            deal={item?.limitedTimeDeal}
            numberOfRating={numberOfRating}
            oldPrice={item?.price}
            price={price}
            rating={numberOfRating > 0 ? rating : 0}
            source={item?.image}
            toolName={item?.artName}
            key={item?.id}
            id={item?.id}
          />
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
});
export default Tools;
