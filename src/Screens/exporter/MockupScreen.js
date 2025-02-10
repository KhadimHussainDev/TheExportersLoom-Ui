import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
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

  const handleEstimateCost = async () => {
    const userContent = `${projectDescription} ${additionalDetails}`;
    try {
      const response = await estimateCost(userContent);
      console.log(response.data);
      if (response.status > 201) {
        throw new Error("Network response was not ok");
      }

      Alert.alert("Success", "Cost estimation successful");
      navigation.navigate("MockupDetailsGathering", { data: response.data });
    } catch (error) {
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

      <Text style={styles.labeladdtionaldetail}>Additinal Details: </Text>
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
      >
        <Text style={styles.buttonText}>Estimate Cost </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MockupScreen;