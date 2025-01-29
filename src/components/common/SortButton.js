import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import SortButtonStyle from "../../Styles/Components/SortButtonStyle";
import { colors } from "../../Styles/Themes/colors";

const { width, height } = Dimensions.get("window");
const styles = SortButtonStyle(width, height);

const SortButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.sortButton, isActive && { backgroundColor: colors.primary }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default SortButton;
