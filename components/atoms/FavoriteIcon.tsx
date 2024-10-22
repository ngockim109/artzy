import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
type FavoriteIconProps = {
  favorite: boolean;
  className?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};
const FavoriteIcon = ({
  favorite,
  className,
  style,
  color,
  onPress,
  ...otherProps
}: FavoriteIconProps) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialIcons
        name={`${favorite ? "favorite" : "favorite-border"}`}
        size={20}
        color={color}
        className={className}
        style={style}
        {...otherProps}
      />
    </Pressable>
  );
};

export default FavoriteIcon;
