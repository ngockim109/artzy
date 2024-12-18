import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
import FilterStar from "@/components/templates/FilterStar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoriteIcon from "@/components/atoms/FavoriteIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import SortFeedbacks from "@/components/SortFeedbacks";
import { sortFeedbacks } from "@/utils/sortFeedbacks";
import Entypo from "@expo/vector-icons/Entypo";

const feedbacks = () => {
  const { id } = useLocalSearchParams();
  const [tool, setTool] = useState<ITool | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<IFeedback[]>([]);
  const [currentSortOption, setCurrentSortOption] =
    useState<string>("relevant");
  const [areSortApplied, setAreSortApplied] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const router = useRouter();
  const highlightIcon = useThemeColor({}, "highlight");

  const getTools = async () => {
    try {
      setLoading(true);
      const response = await api.get("/art-tools/");
      if (response.status === 200) {
        const fetchedTool = response.data.find((t: ITool) => t.id === id);
        if (fetchedTool) {
          setTool(fetchedTool);
          const storedFavorites = await AsyncStorage.getItem("favorites");
          if (storedFavorites) {
            // Filter tools to find favorites by matching their IDs
            const favoriteIds = JSON.parse(storedFavorites);
            setIsFavorite(favoriteIds.includes(fetchedTool.id));
            setAvgRating(averageRating(fetchedTool?.feedbacks));
            setFilteredFeedbacks(fetchedTool?.feedbacks);
            setLoading(false);
          } else {
            setIsFavorite(false); // No favorites stored, so set to false
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        // Remove from favorites
        favoriteIds = favoriteIds.filter((favId: string) => favId !== tool?.id);
      } else {
        // Add to favorites
        favoriteIds.push(tool?.id);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteIds));
      setIsFavorite(!isFavorite); // Toggle favorite state
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const applyFilter = (selectedId: string) => {
    let feedbacksToDisplay = tool?.feedbacks ?? [];
    if (selectedId !== "All") {
      feedbacksToDisplay = feedbacksToDisplay.filter(
        (feedback) => feedback.rating === Number(selectedId)
      );
    }
    feedbacksToDisplay = sortFeedbacks(feedbacksToDisplay, currentSortOption);

    setFilteredFeedbacks(feedbacksToDisplay);
  };

  const checkFeedbacksComments = (feedbacks: IFeedback[]): boolean => {
    return feedbacks.some(
      (fb) => fb?.comment !== undefined && fb?.comment !== ""
    );
  };
  const handleSortChange = (sortOption: string) => {
    setCurrentSortOption(sortOption);
    const sortedFeedbacks = sortFeedbacks(filteredFeedbacks, sortOption);
    setFilteredFeedbacks(sortedFeedbacks);

    setAreSortApplied(sortOption !== "relevant");
  };

  useEffect(() => {
    getTools();
  }, [id]);
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
                  className="p-3 rounded-full mr-2"
                  style={{ backgroundColor: Colors.light.grayLight }}
                />
              </TouchableOpacity>
              <ThemedText type="subtitle">Customer Reviews</ThemedText>
            </>
          ),
          headerRight: () => (
            <View className="relative flex-row items-center gap-1">
              <TouchableOpacity onPress={() => setIsShowMenu(true)}>
                <Entypo name="dots-three-vertical" size={24} color="black" />
              </TouchableOpacity>
              <Modal
                transparent
                visible={isShowMenu}
                animationType="fade"
                onRequestClose={() => setIsShowMenu(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    paddingTop: 60,
                    paddingRight: 15,
                  }}
                  onPress={() => setIsShowMenu(false)}
                >
                  <View
                    style={{
                      width: 150,
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setIsShowMenu(false);
                        router.push("/");
                      }}
                      style={{ paddingVertical: 5 }}
                    >
                      <ThemedText style={{ fontSize: 16 }}>Home</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsShowMenu(false);
                        router.push("/favorites");
                      }}
                      style={{ paddingVertical: 5 }}
                    >
                      <ThemedText style={{ fontSize: 16 }}>
                        Favorites
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
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
            <ThemedView
              key={5 - index}
              className="flex-row gap-1 items-center mt-2"
            >
              <ThemedText style={{ width: 70 }}>
                {5 - index} star{5 - index === 1 ? "" : "s"}
              </ThemedText>
              <RatingBar
                allRating={tool?.feedbacks?.length ?? 0}
                numberOfRating={countRatingByStar(
                  tool?.feedbacks ?? [],
                  5 - index
                )}
              />
            </ThemedView>
          ))}

          <FilterStar
            onFilterChange={applyFilter}
            feedbacks={tool?.feedbacks ?? []}
          />
          <SortFeedbacks onSortChange={handleSortChange} />
          {checkFeedbacksComments(filteredFeedbacks ?? []) ? (
            filteredFeedbacks.map((feedback) => (
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
              <ThemedText>There are 0 reviews.</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
};

export default feedbacks;
