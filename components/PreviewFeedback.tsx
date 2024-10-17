import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import IFeedback from "@/interface/feedback.interface";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import AntDesign from "@expo/vector-icons/AntDesign";
import FeedbackItem from "./molecules/FeedbackItem";
import { Colors } from "@/constants/Colors";

type PreviewFeedbackProps = {
  feedbacks: IFeedback[];
};
const PreviewFeedback = ({ feedbacks }: PreviewFeedbackProps) => {
  const router = useRouter();
  let rating = 0;
  let numberOfRating = 0;
  const checkFeedbacksComments = (feedbacks: IFeedback[]): boolean => {
    feedbacks.forEach((fb) => {
      return fb?.comment !== undefined && fb?.comment !== "";
    });
    return false;
  };
  return (
    <ThemedView>
      <ThemedView>
        <ThemedView>
          <ThemedView className="flex">
            <StarRatingDisplay
              rating={rating}
              starSize={16}
              style={{ alignItems: "center" }}
              starStyle={{ marginRight: 0, marginLeft: 0 }}
            />
            <ThemedText type="subtext">{rating}/5</ThemedText>
          </ThemedView>
          <ThemedText className="text-slate-300" type="subtext">
            ({numberOfRating}) rating
          </ThemedText>
          <TouchableOpacity
            onPress={() => router.push(`/tools/[${id}]/feedbacks`)}
          ></TouchableOpacity>
          <AntDesign name="right" size={16} color="black" />
        </ThemedView>
      </ThemedView>
      {checkFeedbacksComments(feedbacks) ? (
        feedbacks?.map((feedback) => (
          <FeedbackItem
            feedback={feedback}
            key={`${feedback?.userId}_${feedback.date}`}
          />
        ))
      ) : (
        <ThemedView
          lightColor={Colors.light.grayLight}
          darkColor={Colors.dark.grayLight}
        >
          <ThemedText>
            There are 0 customer reviews and {feedbacks?.length} customer
            ratings.
          </ThemedText>
        </ThemedView>
      )}
      <TouchableOpacity onPress={() => router.push(`/tools/[${id}]/feedbacks`)}>
        <Text>See all reviews ({feedbacks?.length})</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default PreviewFeedback;
