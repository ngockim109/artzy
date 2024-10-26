import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native"; // Use useNavigation from React Navigation

type NotificationProps = {
  message: string;
  actionName: string;
  visible: boolean;
  onDismiss: () => void;
  onPress: () => void;
};

const Notification = ({
  message,
  actionName,
  visible,
  onDismiss,
  onPress,
}: NotificationProps) => {
  const translateY = new Animated.Value(100); // Start off-screen

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0, // Slide into view
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto dismiss after 4 seconds
      const timer = setTimeout(() => {
        onDismiss();
      }, 10000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    } else {
      Animated.timing(translateY, {
        toValue: 100, // Slide out of view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null; // Don't render if not visible

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.notificationContainer, { transform: [{ translateY }] }]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.notificationText}>{message}</Text>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.viewButton}>
            <ThemedText
              lightColor={Colors.light.white}
              darkColor={Colors.dark.white}
            >
              {actionName}
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 8,
    zIndex: 1000,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, // Adding gap between text and button
  },
  notificationText: {
    color: "white",
    textAlign: "center",
  },
  viewButton: {
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default Notification;
