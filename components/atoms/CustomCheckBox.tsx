import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

const CustomCheckbox = ({
  isChecked,
  onPress,
}: {
  isChecked: boolean;
  onPress: (() => void) | undefined;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.light.primary,
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "white",
  },
});
export default CustomCheckbox;
