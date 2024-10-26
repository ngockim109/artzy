import React from "react";
import ITool from "@/interface/tool.interface";
import { ThemedView } from "./ThemedView";
import { calculatePrice } from "@/utils/calculatePrice";
import { FlatList } from "react-native";
import ToolCardDeal from "./ToolCardDeal";

type ToolsProps = {
  toolData: ArrayLike<ITool>;
};
const LimitedTimeDealProducts = ({ toolData }: ToolsProps) => {
  return (
    <FlatList
      data={toolData}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ThemedView style={{ width: 190, marginRight: 8 }}>
          <ToolCardDeal
            deal={item?.limitedTimeDeal}
            oldPrice={item?.price}
            price={calculatePrice(item?.limitedTimeDeal, item?.price)}
            source={item?.image}
            key={item?.id}
            id={item?.id}
            noCardWidth={true}
          />
        </ThemedView>
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

export default LimitedTimeDealProducts;
