import React from "react";
import ITool from "@/interface/tool.interface";
import ToolCard from "@/components/molecules/ToolCard";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { calculatePrice } from "@/utils/calculatePrice";
import { averageRating } from "@/utils/averageRating";

type ToolsProps = {
  toolData: ITool[];
};
const Tools = ({ toolData }: ToolsProps) => {
  return (
    <ThemedView
      className="flex-row flex-wrap justify-between"
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
    >
      {toolData?.map((item: ITool) => {
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
      })}
    </ThemedView>
  );
};

export default Tools;
