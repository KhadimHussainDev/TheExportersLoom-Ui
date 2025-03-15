import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { createIconButtonStyles } from "../../Styles/Components/IconButtonStyles";

const IconButton = ({ iconName, width, height }) => {
  const styles = createIconButtonStyles(width, height);

  const handleIconPress = () => {
    Alert.alert("Icon Pressed", `${iconName} icon was pressed.`);
  };

  return (
    <TouchableOpacity onPress={handleIconPress} style={styles.iconButton}>
      <Ionicons name={iconName} size={18} color="white" />
    </TouchableOpacity>
  );
};

export default IconButton;
