import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import IFeedback from "@/interface/feedback.interface";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

type FeedbackItemProps = {
  feedback: IFeedback;
};
const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const theme = useColorScheme();
  return (
    feedback !== null && (
      <ThemedView
        className="border-b px-2 py-3"
        style={{
          borderColor:
            theme === "light" ? Colors.light.slate : Colors.dark.slate,
        }}
      >
        <ThemedView className="flex-row justify-between">
          <ThemedText type="defaultSemiBold">{feedback?.userId}</ThemedText>
          <ThemedText type="subtext">{feedback?.date}</ThemedText>
        </ThemedView>
        <StarRatingDisplay
          rating={feedback?.rating}
          starSize={16}
          style={{ alignItems: "center" }}
          starStyle={{ marginRight: 0, marginLeft: 0 }}
        />
        <ThemedText className="mt-1">{feedback?.comment}</ThemedText>
      </ThemedView>
    )
  );
};

export default FeedbackItem;
