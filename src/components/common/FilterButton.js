import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FilterButtonStyle } from "../../Styles/Components/FilterButtonStyle";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = FilterButtonStyle(width, height);

const FilterButton = ({ label, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.defaultButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
