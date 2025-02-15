import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MockupScreenStyles from "../../Styles/Screens/Exporter/MockupScreenStyles";
import getWindowDimensions from "../../utils/helpers/dimensions";
import estimateCost from "../../api/costEstimation";

const { width, height } = getWindowDimensions();
const styles = MockupScreenStyles(width, height);

const MockupScreen = ({ navigation }) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEstimateCost = async () => {
    const userContent = `${projectDescription} ${additionalDetails}`;
    setLoading(true);
    try {
      // const response = await estimateCost(userContent);

      // if (response.status !== 200) {
      //   throw new Error("Network response was not ok");
      // }
      await new Promise(resolve => setTimeout(resolve, 3000));
      setLoading(false);
      Alert.alert("Success", "Requirements Extracted Successfully!");
      navigation.navigate("MockupDetailsGathering", { data: "" });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelprojectdetail}>Project Details</Text>
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

      <Text style={styles.labeladdtionaldetail}>Additional Details: </Text>
      <TextInput
        style={styles.inputMultiline}
        placeholder="Enter other details(optional)"
        multiline
        textAlignVertical="top"
        value={additionalDetails}
        onChangeText={setAdditionalDetails}
      />

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