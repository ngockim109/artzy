import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import api from "@/api/api";
import ITool from "@/interface/tool.interface";
import Loading from "@/components/Loading";
import { ThemedView } from "@/components/ThemedView";
import IFeedback from "@/interface/feedback.interface";
import FeedbackItem from "@/components/molecules/FeedbackItem";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import {
  averageRating,
  countRatingByStar,
  percentageOfRatingByStar,
} from "@/utils/averageRating";
import RatingBar from "@/components/atoms/RatingBar";

const feedbacks = () => {
  const { id } = useLocalSearchParams();
  const [tool, setTool] = useState<ITool | null>(null);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getTool = async () => {
    try {
      setLoading(true);
      const response = await api.get("/art-tools/" + id);
      if (response.status === 200) {
        setTool(response.data);
        setLoading(false);
        setAvgRating(averageRating(response?.data?.feedbacks));
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(id);
  useEffect(() => {
    getTool();
  }, [id]);
  const checkFeedbacksComments = (feedbacks: IFeedback[]): boolean => {
    return feedbacks.some(
      (fb) => fb?.comment !== undefined && fb?.comment !== ""
    );
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "", dark: "" }}
      hideHeader
    >
      <Stack.Screen
        options={{
          headerTransparent: false,
          headerTitle: "",
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                  className="p-3 rounded-full"
                  style={{ backgroundColor: Colors.light.grayLight }}
                />
              </TouchableOpacity>
              <ThemedText type="subtitle">Customer Reviews</ThemedText>
            </>
          ),
        }}
      ></Stack.Screen>

      {loading ? (
        <Loading />
      ) : (
        <ThemedView>
          <ThemedView className="flex-row gap-1">
            <StarRatingDisplay
              rating={avgRating}
              starSize={16}
              style={{ alignItems: "center" }}
              starStyle={{ marginRight: 0, marginLeft: 0 }}
            />
            <ThemedText type="subtitle">{avgRating}/5</ThemedText>
          </ThemedView>
          {tool?.feedbacks && (
            <ThemedText className="text-slate-300" type="subtext">
              {tool?.feedbacks?.length ?? 0}
              {tool?.feedbacks?.length > 1 ? " ratings" : " rating"}
            </ThemedText>
          )}

          {Array.from({ length: 5 }, (_, index) => (
            <ThemedView className="flex-row gap-2 items-center mt-2">
              <ThemedText style={{ width: 70 }}>
                {index + 1} star{index + 1 <= 1 ? "" : "s"}
              </ThemedText>
              <RatingBar
                allRating={tool?.feedbacks?.length ?? 0}
                numberOfRating={countRatingByStar(
                  tool?.feedbacks ?? [],
                  index + 1
                )}
              />
            </ThemedView>
          ))}

          {checkFeedbacksComments(tool?.feedbacks ?? []) ? (
            tool?.feedbacks.map((feedback) => (
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
                There are 0 customer reviews and {tool?.feedbacks?.length}{" "}
                customer ratings.
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
};

export default feedbacks;
