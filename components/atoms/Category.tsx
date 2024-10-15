import { View, Text, StyleProp, ImageStyle, Image } from "react-native";
import React from "react";

type CategoryProps = {
  src: string;
  style?: StyleProp<ImageStyle>;
};
const Category = ({ src, style, ...otherProps }: CategoryProps) => {
  return <Image source={{ uri: src }} style={style} {...otherProps} />;
};

export default Category;
