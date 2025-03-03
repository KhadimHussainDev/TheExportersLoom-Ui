import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  businessDomains,
  serviceTypeOptions,
} from "../../utils/Data/businessData";
import ServiceTypeSelection from "../../components/manufacturer/ServiceTypeSelection";
import ImagePickerCarousel from "../../components/manufacturer/ImagePickerCarousel";

export default function ManufacturerRegistration() {
  const [selectedBusinessDomain, setSelectedBusinessDomain] = useState("");
  const [serviceTypes, setServiceTypes] = useState({});
  const [selectedMachines, setSelectedMachines] = useState({});
  const [otherServiceType, setOtherServiceType] = useState("");
  const [dailyOutput, setDailyOutput] = useState("");
  const [pastProjectsDescription, setPastProjectsDescription] = useState("");

  const handleBusinessDomainChange = (itemValue) => {
    setSelectedBusinessDomain(itemValue);
    setServiceTypes(
      serviceTypeOptions[itemValue]?.reduce((acc, service) => {
        acc[service] = false;
        return acc;
      }, {}) || {}
    );
    setSelectedMachines({}); // Reset machine selection
  };

  const toggleCheckbox = (key) => {
    setServiceTypes({ ...serviceTypes, [key]: !serviceTypes[key] });

    // Reset machines when service type is unchecked
    if (serviceTypes[key]) {
      setSelectedMachines((prevMachines) => {
        const updatedMachines = { ...prevMachines };
        delete updatedMachines[key];
        return updatedMachines;
      });
    }
  };

  // Calculate monthly output (26 working days)
  const monthlyOutput = dailyOutput
    ? (parseInt(dailyOutput) * 26).toString()
    : "";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Business Domain</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBusinessDomain}
          onValueChange={handleBusinessDomainChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Business Domain" value="" />
          {businessDomains.map((domain, index) => (
            <Picker.Item key={index} label={domain} value={domain} />
          ))}
        </Picker>
      </View>

      {selectedBusinessDomain && (
        <ServiceTypeSelection
          serviceTypes={serviceTypes}
          toggleCheckbox={toggleCheckbox}
          otherServiceType={otherServiceType}
          setOtherServiceType={setOtherServiceType}
          selectedBusinessDomain={selectedBusinessDomain}
          selectedMachines={selectedMachines}
          setSelectedMachines={setSelectedMachines}
        />
      )}

      <Text style={styles.label}>Daily Output (pieces/day)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Daily Output"
        onChangeText={setDailyOutput}
        value={dailyOutput}
      />

      <Text style={styles.label}>Monthly Output</Text>
      <TextInput style={styles.input} value={monthlyOutput} editable={false} />

      <ImagePickerCarousel
        labelText="To Pick the Machine Images"
        buttonText="Select Machine Images"
      />

      <Text style={styles.label}>Past Work Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe Past Projects"
        onChangeText={setPastProjectsDescription}
        value={pastProjectsDescription}
        multiline
      />

      <ImagePickerCarousel
        labelText="To Pick the Previously Completed Work"
        buttonText="Select Past Work Image"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF", // Light background
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B4B4B", // Darker text
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#BFBFBF", // Light border
    borderRadius: 8,
    backgroundColor: "#F8F8F8", // Light gray background
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BFBFBF",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
    marginBottom: 12,
    fontSize: 14,
    color: "#333", // Darker text
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 40,
  },
  cancelButton: {
    backgroundColor: "#E6E6E6", // Light gray
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#FFB703", // Golden yellow
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "#4B4B4B",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
