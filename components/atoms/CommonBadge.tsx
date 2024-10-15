import { View, Text } from "react-native";
import React from "react";

type CommonBadgeProps = {
  text: string;
  status: string;
};
const CommonBadge = ({ text, status }: CommonBadgeProps) => {
  let color;
  switch (status) {
    case "highlight":
      color = "#FF0000";
      break;
    case "information":
      color = "#0000FF";
      break;
    case "success":
      color = "#00FF00";
      break;
    case "warning":
      color = "#00FF00";
      break;
    default:
      color = "#000000";
      break;
  }
  return (
    <View className="p-1 rounded-sm px-2" style={{ backgroundColor: color }}>
      <Text className="text-white text-xs">{text}</Text>
    </View>
  );
};

export default CommonBadge;
