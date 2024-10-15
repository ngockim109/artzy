import { Image, ImageStyle, StyleProp } from "react-native";
import React from "react";

type BrandCardProps = {
  src: string;
  style?: StyleProp<ImageStyle>;
};
const BrandCard = ({ src, style, ...otherProps }: BrandCardProps) => {
  return <Image source={{ uri: src }} style={style} {...otherProps} />;
};

export default BrandCard;
