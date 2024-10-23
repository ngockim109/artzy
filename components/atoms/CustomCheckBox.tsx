import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const CustomCheckbox = ({
  isChecked,
  onToggle,
}: {
  isChecked: boolean;
  onToggle: (() => void) | undefined;
}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <View style={styles.checkmark} />}
      </View>
    </TouchableOpacity>
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
