import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import React from "react";
import { StyleProp, ViewStyle } from "react-native";
type FavoriteIconProps = {
  favorite: boolean;
  className?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};
const FavoriteIcon = ({
  favorite,
  className,
  style,
  color,
  ...otherProps
}: FavoriteIconProps) => {
  return (
    <MaterialIcons
      name={`${favorite ? "favorite" : "favorite-border"}`}
      size={20}
      color={color}
      className={className}
      style={style}
      {...otherProps}
    />
  );
};

export default FavoriteIcon;
