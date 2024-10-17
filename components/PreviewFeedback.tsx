import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import IFeedback from "@/interface/feedback.interface";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import AntDesign from "@expo/vector-icons/AntDesign";
import FeedbackItem from "./molecules/FeedbackItem";
import { Colors } from "@/constants/Colors";
import { averageRating } from "@/utils/averageRating";
import { useColorScheme } from "@/hooks/useColorScheme.web";

type PreviewFeedbackProps = {
  feedbacks: IFeedback[];
  toolId: string;
};
const PreviewFeedback = ({ feedbacks, toolId }: PreviewFeedbackProps) => {
  const router = useRouter();
  const theme = useColorScheme();
  const checkFeedbacksComments = (feedbacks: IFeedback[]): boolean => {
    return feedbacks.some(
      (fb) => fb?.comment !== undefined && fb?.comment !== ""
    );
  };
  return (
    <ThemedView className="mt-1">
      <ThemedView>
        <TouchableOpacity
          onPress={() => router.push(`/tools/[${toolId}]/feedbacks`)}
        >
          <ThemedView className="flex-row justify-between align-middle items-center">
            <ThemedView>
              <ThemedView className="flex-row gap-1">
                <StarRatingDisplay
                  rating={averageRating(feedbacks)}
                  starSize={16}
                  style={{ alignItems: "center" }}
                  starStyle={{ marginRight: 0, marginLeft: 0 }}
                />
                <ThemedText type="subtitle">
                  {averageRating(feedbacks)}/5
                </ThemedText>
              </ThemedView>
              <ThemedText className="text-slate-300" type="subtext">
                {feedbacks?.length ?? 0}
                {feedbacks?.length > 1 ? " ratings" : " rating"}
              </ThemedText>
            </ThemedView>

            <AntDesign name="right" size={16} color="black" />
          </ThemedView>
        </TouchableOpacity>
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
          className="py-3 px-3"
        >
          <ThemedText>
            There are 0 customer reviews and {feedbacks?.length} customer
            ratings.
          </ThemedText>
        </ThemedView>
      )}
      {checkFeedbacksComments(feedbacks) && (
        <TouchableOpacity
          onPress={() => router.push(`/tools/[${toolId}]/feedbacks`)}
        >
          <ThemedView
            className="border px-3 py-2 rounded-full mt-3 flex-row justify-center"
            style={{
              borderColor:
                theme === "light"
                  ? Colors.light.buttonOutlineText
                  : Colors.dark.buttonOutlineText,
            }}
          >
            <ThemedText
              type="defaultSemiBold"
              lightColor={Colors.light.buttonOutlineText}
              darkColor={Colors.dark.buttonOutlineText}
            >
              See all reviews ({feedbacks?.length})
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

export default PreviewFeedback;
