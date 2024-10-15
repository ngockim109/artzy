import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import "@/styles/styles.css";

type BadgeProps = {
  text: string;
  darkColor: string;
  textDarkColor: string;
  lightColor: string;
  textLightColor: string;
};
const Badge = ({
  text,
  lightColor,
  textLightColor,
  darkColor,
  textDarkColor,
}: BadgeProps) => {
  return (
    <ThemedView
      lightColor={lightColor}
      darkColor={darkColor}
      className={`absolute z-20 top-2 right-3 rounded-full w-6 h-6 flex items-center justify-center`}
    >
      <ThemedText
        lightColor={textLightColor}
        darkColor={textDarkColor}
        className={`text-xs`}
      >
        {text}
      </ThemedText>
    </ThemedView>
  );
};

export default Badge;
