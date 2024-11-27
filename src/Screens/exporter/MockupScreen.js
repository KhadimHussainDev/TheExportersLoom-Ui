import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MockupScreenStyles from "../../Styles/Screens/Exporter/MockupScreenStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import { colors } from "../../Styles/Themes/colors";

const { width, height } = getWindowDimensions();
const styles = MockupScreenStyles(width, height);

const MockupScreen = () => (
  <View style={styles.container}>
    <Text style={styles.labelprojectdetail}>Project Details</Text>
    <View style={styles.inputContainer}>
      <Icon
        name="paperclip"
        size={height * 0.025}
        color="#000"
        style={styles.icon}
      />
      <TextInput style={styles.input} placeholder="Enter Project Description" />
    </View>

    <Text style={styles.labeladdtionaldetail}>Additinal Details: </Text>
    <TextInput
      style={styles.inputMultiline}
      placeholder="Enter other details(optional)"
      multiline
      textAlignVertical="top"
    />

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Estimate Cost </Text>
    </TouchableOpacity>
  </View>
);

export default MockupScreen;
