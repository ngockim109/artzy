import React from "react";
import ITool from "@/interface/tool.interface";
import ToolCard from "@/components/molecules/ToolCard";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { calculatePrice } from "@/utils/calculatePrice";
import { averageRating } from "@/utils/averageRating";
import { FlatList } from "react-native";

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
          <ToolCard
            deal={item?.limitedTimeDeal}
            numberOfRating={item?.feedbacks?.length ?? 0}
            oldPrice={item?.price}
            price={calculatePrice(item?.limitedTimeDeal, item?.price)}
            rating={averageRating(item?.feedbacks)}
            source={item?.image}
            toolName={item?.artName}
            key={item?.id}
            id={item?.id}
            noCardWidth={true}
            glassSurface={item?.glassSurface}
          />
        </ThemedView>
      )}
      keyExtractor={(item) => item?.id}
    />
    // <ThemedView
    //   className="flex-row flex-wrap justify-between"
    //   lightColor={Colors.light.background}
    //   darkColor={Colors.dark.background}
    // >
    //   {toolData?.map((item: ITool) => {
    //     return (
    //       <ToolCard
    //         deal={item?.limitedTimeDeal}
    //         numberOfRating={item?.feedbacks?.length ?? 0}
    //         oldPrice={item?.price}
    //         price={calculatePrice(item?.limitedTimeDeal, item?.price)}
    //         rating={averageRating(item?.feedbacks)}
    //         source={item?.image}
    //         toolName={item?.artName}
    //         key={item?.id}
    //         id={item?.id}
    //       />
    //     );
    //   })}
    // </ThemedView>
  );
};

export default LimitedTimeDealProducts;
