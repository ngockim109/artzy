import React from "react";
import ITool from "@/interface/tool.interface";
import ToolCard from "@/components/molecules/ToolCard";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { calculatePrice } from "@/utils/calculatePrice";
import { averageRating } from "@/utils/averageRating";
import MasonryList from "@react-native-seoul/masonry-list";
type ToolsProps = {
  toolData: ITool[];
};
const Tools = ({ toolData }: ToolsProps) => {
  return (
    <ThemedView
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      <MasonryList
        data={toolData}
        keyExtractor={(item: ITool): string => item.id}
        numColumns={2}
        contentContainerStyle={{
          alignSelf: "stretch",
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => (
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
            glassSurface={item?.glassSurface}
            noCardWidth
            index={i}
          />
        )}
      />
      {/* {toolData?.map((item: ITool) => {
        return (
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
            glassSurface={item?.glassSurface}
          />
        );
      })} */}
    </ThemedView>
  );
};

export default Tools;
