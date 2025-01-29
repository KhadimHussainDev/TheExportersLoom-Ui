import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SamplePage = () => {
  const [numberOfLogos, setNumberOfLogos] = useState(0);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleNumberOfLogosChange = (value) => {
    const num = parseInt(value, 10);
    setNumberOfLogos(num);

    // Reset positions and types for new dropdowns
    setSelectedPositions(Array(num).fill(""));
    setSelectedTypes(Array(num).fill(""));
  };

  const handlePositionChange = (value, index) => {
    const updatedPositions = [...selectedPositions];
    updatedPositions[index] = value;
    setSelectedPositions(updatedPositions);
  };

  const handleTypeChange = (value, index) => {
    const updatedTypes = [...selectedTypes];
    updatedTypes[index] = value;
    setSelectedTypes(updatedTypes);
  };

  const handleSubmit = () => {
    // Combine selected positions and types into a structured array
    const selectedData = Array.from({ length: numberOfLogos }, (_, index) => ({
      logo: `Logo ${index + 1}`,
      position: selectedPositions[index] || "Not selected",
      type: selectedTypes[index] || "Not selected",
    }));

    const formattedMessage = selectedData
      .map(
        (data) =>
          `${data.logo}: Position - ${data.position}, Type - ${data.type}`
      )
      .join("\n");

    // Log the structured data to the console
    Alert.alert("Selected Data", formattedMessage, [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of Logos</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={numberOfLogos.toString()}
          onValueChange={handleNumberOfLogosChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Number of Logos" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
      </View>
      {Array.from({ length: numberOfLogos }, (_, index) => (
        <View key={index} style={styles.dropdownRow}>
          <Text style={styles.label}>Logo {index + 1} Position</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPositions[index]}
              onValueChange={(value) => handlePositionChange(value, index)}
              style={styles.picker}
            >
              <Picker.Item label={`Select Position`} value="" />
              <Picker.Item label="Top" value="top" />
              <Picker.Item label="Bottom" value="bottom" />
              <Picker.Item label="Left" value="left" />
              <Picker.Item label="Right" value="right" />
            </Picker>
          </View>
          <Text style={styles.label}>Logo {index + 1} Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTypes[index]}
              onValueChange={(value) => handleTypeChange(value, index)}
              style={styles.picker}
            >
              <Picker.Item label={`Select Type`} value="" />
              <Picker.Item label="Type 1" value="type1" />
              <Picker.Item label="Type 2" value="type2" />
              <Picker.Item label="Type 3" value="type3" />
            </Picker>
          </View>
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 2,
  },
  picker: {
    height: 60,
    width: 300,
  },
  dropdownRow: {
    marginVertical: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default SamplePage;
