import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MockupScreenStyles from "../../Styles/Screens/Exporter/MockupScreenStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import estimateCost from "../../api/costEstimation";

const { width, height } = getWindowDimensions();
const styles = MockupScreenStyles(width, height);

const MockupScreen = ({ navigation }) => {
  // State variables for input fields
  const [projectDescription, setProjectDescription] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  // Function to handle cost estimation
  const handleEstimateCost = () => {
    // JSON object to store mockup details
    const mockupData = {
      projectDescription: projectDescription.trim(),
      additionalDetails: additionalDetails.trim(),
    };

    // Log the JSON data in console
    console.log("Mockup Data:", JSON.stringify(mockupData, null, 2));

    // Alert confirmation
    Alert.alert("Success", "Your mockup details have been saved!");

    // Navigate to next screen
    navigation.navigate("MockupDetailsGathering");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelprojectdetail}>Project Details</Text>

      {/* Project Description Input */}
      <View style={styles.inputContainer}>
        <Icon
          name="paperclip"
          size={height * 0.025}
          color="#000"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Project Description"
          value={projectDescription}
          onChangeText={setProjectDescription}
        />
      </View>

      {/* Additional Details Input */}
      <Text style={styles.labeladdtionaldetail}>Additional Details:</Text>
      <TextInput
        style={styles.inputMultiline}
        placeholder="Enter other details (optional)"
        value={additionalDetails}
        onChangeText={setAdditionalDetails}
        multiline
        textAlignVertical="top"
      />

      {/* Estimate Cost Button */}
      <TouchableOpacity onPress={handleEstimateCost} style={styles.button}>
        <Text style={styles.buttonText}>Estimate Cost</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MockupScreen;