import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import SortButtonStyle from "../../Styles/Components/SortButtonStyle";
import { colors } from "../../Styles/Themes/colors";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = SortButtonStyle(width, height);

const SortButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.sortButton, isActive && { backgroundColor: "#007BFF" }]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default SortButton;
