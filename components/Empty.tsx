import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

type EmptyProps = {
  title: string;
  description: string;
  buttonText?: string;
  noAction?: boolean;
  icon: string;
  handlePress?: () => void;
};

const Empty = ({
  buttonText,
  description,
  handlePress,
  title,
  icon,
  noAction = false,
}: EmptyProps) => {
  return (
    <View>
      <AntDesign name={icon} color={Colors.light.gray} size={30} />
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedText>{description}</ThemedText>
      {!noAction ? (
        <TouchableOpacity
          onPress={handlePress}
          className="border border-primary rounded-full"
        >
          <ThemedText
            lightColor={Colors.light.buttonOutlineText}
            darkColor={Colors.dark.buttonOutlineText}
          >
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Empty;
