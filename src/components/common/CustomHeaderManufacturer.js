import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { colors } from "../../Styles/Themes/colors";
import CustomHeaderStyles from "../../Styles/Components/CustomHeaderStyles";

const { width, height } = getWindowDimensions();
const styles = CustomHeaderStyles(width, height);

const CustomHeaderManufacturer = ({
  navigation,
  title,
  leftIconName,
  rightIconName,
  onLefttIconPress,
  onRightIconPress,
}) => {
  const [tapMessage, setTapMessage] = useState("");

  return (
    <View style={styles.headerContainer}>
      {/* Header Row with Icons */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerIcon} onPress={onLefttIconPress}>
          <Icon
            name={leftIconName}
            size={height * 0.035}
            style={styles.leftrigthicon}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon} onPress={onRightIconPress}>
          <Icon
            name={rightIconName}
            size={height * 0.035}
            style={styles.leftrigthicon}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextInputContainer}>
          <TextInput
            style={styles.headerTextInput}
            placeholder="Search for your orders"
            placeholderTextColor={colors.background}
            onFocus={() =>
              setTapMessage(
                "Better is to scroll & find orders in request tab:)"
              )
            }
          />
          <Icon name="search" size={height * 0.028} style={styles.searchIcon} />
        </View>
      </View>

      {/* Display Tap Message Below Search Bar */}
      {tapMessage ? (
        <View style={styles.headerRow}>
          <Text style={styles.tapMessage}>{tapMessage}</Text>
        </View>
      ) : (
        <View style={styles.headerRow}>
          <Text style={styles.headerLabelText}>
            Quickly find what you want!
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomHeaderManufacturer;
