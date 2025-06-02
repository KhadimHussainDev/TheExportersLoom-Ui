import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { colors } from "../../Styles/Themes/colors";
import CustomHeaderStyles from "../../Styles/Components/CustomHeaderStyles";

const { width, height } = getWindowDimensions();
const baseStyles = CustomHeaderStyles(width, height);

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
    <View style={baseStyles.headerContainer}>
      {/* Header Row with Icons */}
      <View style={baseStyles.headerRow}>
        <TouchableOpacity style={baseStyles.headerIcon} onPress={onLefttIconPress}>
          <Icon
            name={leftIconName}
            size={height * 0.035}
            style={baseStyles.leftrigthicon}
          />
        </TouchableOpacity>
        <View style={baseStyles.headerTitleContainer}>
          <Text style={baseStyles.headerTitle}>{title}</Text>
        </View>
        {rightIconName && (
          <TouchableOpacity style={baseStyles.headerIcon} onPress={onRightIconPress}>
            <Icon
              name={rightIconName}
              size={height * 0.035}
              style={baseStyles.leftrigthicon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar */}
      <View style={baseStyles.headerRow}>
        <View style={baseStyles.headerTextInputContainer}>
          <TextInput
            style={baseStyles.headerTextInput}
            placeholder="Search for your orders"
            placeholderTextColor={colors.background}
            onFocus={() =>
              setTapMessage(
                "Better is to scroll & find orders in request tab:)"
              )
            }
          />
          <Icon name="search" size={height * 0.028} style={baseStyles.searchIcon} />
        </View>
      </View>

      {/* Display Tap Message Below Search Bar */}
      {tapMessage ? (
        <View style={baseStyles.headerRow}>
          <Text style={baseStyles.tapMessage}>{tapMessage}</Text>
        </View>
      ) : (
        <View style={baseStyles.headerRow}>
          <Text style={baseStyles.headerLabelText}>
            Quickly find what you want!
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomHeaderManufacturer;
