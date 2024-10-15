import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CommonBadge from "@/components/atoms/CommonBadge";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ITool from "@/interface/tool.interface";
import ToolCard from "@/components/molecules/ToolCard";

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
  let deal: number;
  let numberOfRating: number;
  let rating: number;
  let salePrice: number;
  return (
    <FlatList
      data={toolData}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ToolCard
          deal={item?.limitedTimeDeal}
          numberOfRating={numberOfRating}
          oldPrice={item?.price}
          price={item?.limitedTimeDeal >= 0 ? salePrice : item?.price}
          rating={rating}
          source={item?.image}
          toolName={item?.artName}
          key={item?.id}
          id={item?.id}
        />
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between", // Space between the items in the row
  },
});
export default Tools;
