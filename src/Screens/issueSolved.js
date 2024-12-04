import React, { useState } from 'react';
import { View, Picker, StyleSheet, Button } from 'react-native';

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

    // Log the structured data to the console
    console.log("Selected Data:", selectedData);
  };

  return (
    <View style={styles.container}>
      {/* Number of Logos Dropdown */}
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

      {/* Dynamic Dropdowns for Logo Position and Type */}
      {Array.from({ length: numberOfLogos }, (_, index) => (
        <View key={index} style={styles.dropdownRow}>
          {/* Logo Position Dropdown */}
          <Picker
            selectedValue={selectedPositions[index]}
            onValueChange={(value) => handlePositionChange(value, index)}
            style={styles.picker}
          >
            <Picker.Item label={`Logo ${index + 1} Position`} value="" />
            <Picker.Item label="Top" value="top" />
            <Picker.Item label="Bottom" value="bottom" />
            <Picker.Item label="Left" value="left" />
            <Picker.Item label="Right" value="right" />
          </Picker>

          {/* Logo Type Dropdown */}
          <Picker
            selectedValue={selectedTypes[index]}
            onValueChange={(value) => handleTypeChange(value, index)}
            style={styles.picker}
          >
            <Picker.Item label={`Logo ${index + 1} Type`} value="" />
            <Picker.Item label="Type 1" value="type1" />
            <Picker.Item label="Type 2" value="type2" />
            <Picker.Item label="Type 3" value="type3" />
          </Picker>
        </View>
      ))}

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default SamplePage;
