import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { colors } from "../../Styles/Themes/colors";
import CustomHeaderStyles from "../../Styles/Components/CustomHeaderStyles";
import SearchManufacturerList from "../../Screens/exporter/SearchManufacturerList";

const { width, height } = getWindowDimensions();

const styles = CustomHeaderStyles(width, height);

const CustomHeader = ({
  navigation,
  title,
  leftIconName,
  rightIconName,
  onLefttIconPress,
  onRightIconPress,
}) => (
  <View style={styles.headerContainer}>
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
    <View style={styles.headerRow}>
      <View style={styles.headerTextInputContainer}>
        <TextInput
          style={styles.headerTextInput}
          placeholder="Search for servies or manufacturers"
          placeholderTextColor={colors.background}
        />
        <Icon name="search" size={height * 0.028} style={styles.searchIcon} />
      </View>
    </View>
    <View style={styles.headerRow}>
      <Text style={styles.headerLabelText}>Quickly find what you want !</Text>
    </View>
  </View>
);

export default CustomHeader;
