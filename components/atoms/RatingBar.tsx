import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { ThemedText } from "../ThemedText";

type RatingBarProps = {
  numberOfRating: number;
  allRating: number;
};

const RatingBar = ({ allRating, numberOfRating }: RatingBarProps) => {
  const percentage = allRating > 0 ? (numberOfRating / allRating) * 100 : 0;

  // Set color based on percentage
  const getColor = (percentage: number) => {
    if (percentage > 75) return Colors.light.primary;
    return "#e0e0e0";
  };

  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {/* Progress Bar */}
        <Animated.View
          style={[
            styles.progressBar,
            { width: animatedWidth, backgroundColor: getColor(percentage) },
          ]}
        />
      </View>
      <ThemedText style={styles.percentageText}>
        {Math.round(percentage)}%
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  progressContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
  percentageText: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default RatingBar;
