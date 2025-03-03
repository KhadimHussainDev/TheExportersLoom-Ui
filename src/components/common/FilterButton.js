import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { FilterButtonStyle } from "../../Styles/Components/FilterButtonStyle";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
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
