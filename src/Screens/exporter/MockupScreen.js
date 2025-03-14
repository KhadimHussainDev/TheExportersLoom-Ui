import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { costEstimationService } from "../../services/costEstimationService";
import MockupScreenStyles from "../../Styles/Screens/Exporter/MockupScreenStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";

const { width, height } = getWindowDimensions();
const styles = MockupScreenStyles(width, height);

const MockupScreen = ({ navigation }) => {
  // State variables for input fields
  const [projectDescription, setProjectDescription] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEstimateCost = async () => {
    const userContent = `${projectDescription} ${additionalDetails}`;
    if (!userContent.trim()) {
      Alert.alert("Error", "Please enter project description");
      return;
    }

    setLoading(true);

    try {
      const response = await costEstimationService.estimateCost(userContent);
      if (!response.data?.success) {
        Alert.alert("Error", "Failed to estimate cost. Please try again.");
        setLoading(false);
        return;
      }

      console.log(response.data.data);
      setLoading(false);
      Alert.alert("Success", "Requirements Extracted Successfully!");

      // the data will be of this format
      // {
      //   "fabricType": "<Extracted value or 'undefined'>",
      //   "fabricSubType" : "<Extracted value or 'undefined'>",
      //   "cuttingStyle" : "<Extracted value or 'undefined'>",
      //   "labelType": "<Extracted value or 'undefined'>",
      //   "labelsRequired": <true/false/undefined>,
      //   "numberOfLogos": <Number or 'undefined'>,
      //   "logoDetails": [
      //     //Depens on numberOfLogos
      //     {
      //       "position": "<Extracted value or 'undefined'>",
      //       "type": "<Extracted value or 'undefined'>"
      //     },
      //   ],
      //   "packagingRequired": <true/false/undefined>,
      //   "packagingType": "<Extracted value or 'undefined'>",
      //   "patternRequired": <true/false/undefined>,
      //   "productType": "<Extracted value or 'undefined'>",
      //   "sizes": [
      //     {
      //       "quantity": "<Extracted value or 'undefined'>",
      //       "size": "<Extracted value or 'undefined'>"
      //     },
      //     {
      //       "quantity": "<Extracted value or 'undefined'>",
      //       "size": "<Extracted value or 'undefined'>"
      //     }
      //   ],
      //   "tagCardsRequired": <true/false/undefined>
      // }
      const mockupData = response.data?.data;
      if (typeof mockupData === 'string') {

        try {
          const parsedData = JSON.parse(mockupData);
          navigation.navigate("MockupDetailsGathering", { data: parsedData });
        } catch (jsonError) {
          throw new Error('Invalid data format received');
        }
      } else {
        navigation.navigate("MockupDetailsGathering", { data: mockupData });
      }
    } catch (error) {
      setLoading(false);

      // Check if error is related to network connectivity
      if (!navigator.onLine || error.message.includes('Network') || error.message.includes('connect')) {
        Alert.alert(
          "Connection Error",
          "Please check your internet connection and try again." + error.message
        );
      } else {
        Alert.alert("Error", error.message || "Something went wrong. Please try again.");
      }
    }
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
      <TouchableOpacity
        onPress={handleEstimateCost}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Estimate Cost</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MockupScreen;