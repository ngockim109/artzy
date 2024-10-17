import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import IFeedback from "@/interface/feedback.interface";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { ThemedText } from "../ThemedText";

type FeedbackItemProps = {
  feedback: IFeedback;
};
const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    feedback !== null && (
      <ThemedView>
        <ThemedText>{feedback?.userId}</ThemedText>
        <StarRatingDisplay
          rating={feedback?.rating}
          starSize={16}
          style={{ alignItems: "center" }}
          starStyle={{ marginRight: 0, marginLeft: 0 }}
        />
        <ThemedText type="subtext">{feedback?.date}</ThemedText>
        <ThemedText>{feedback?.comment}</ThemedText>
      </ThemedView>
    )
  );
};

export default FeedbackItem;
