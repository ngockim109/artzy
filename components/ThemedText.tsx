import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "highlight"
    | "remove"
    | "blurText"
    | "large"
    | "subtext";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "subtext" ? styles.subtext : undefined,
        type === "title" ? styles.title : undefined,
        type === "highlight" ? styles.highlight : undefined,
        type === "remove" ? styles.remove : undefined,
        type === "blurText" ? styles.blurText : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "large" ? styles.large : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtext: {
    fontSize: 14,
    lineHeight: 24,
  },
  large: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  highlight: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
    color: Colors?.light.highlight,
  },
  remove: {
    fontSize: 14,
    lineHeight: 24,
    textDecorationLine: "line-through",
  },
  blurText: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
