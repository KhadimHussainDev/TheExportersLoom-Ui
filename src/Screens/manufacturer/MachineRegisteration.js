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
import MapView, { Marker } from "react-native-maps";
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

  // New Fields
  const [machineType, setMachineType] = useState("");
  const [machineModel, setMachineModel] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState(true);
  const [hourlyRate, setHourlyRate] = useState("");
  const [machineDescription, setMachineDescription] = useState("");

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 32.4922,
    longitude: 74.531,
  });

  const handleBusinessDomainChange = (itemValue) => {
    setSelectedBusinessDomain(itemValue);
    setServiceTypes(
      serviceTypeOptions[itemValue]?.reduce((acc, service) => {
        acc[service] = false;
        return acc;
      }, {}) || {}
    );
    setSelectedMachines({});
  };

  const toggleCheckbox = (key) => {
    setServiceTypes({ ...serviceTypes, [key]: !serviceTypes[key] });

    if (serviceTypes[key]) {
      setSelectedMachines((prevMachines) => {
        const updatedMachines = { ...prevMachines };
        delete updatedMachines[key];
        return updatedMachines;
      });
    }
  };

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

      {/* Machine Fields */}
      <Text style={styles.label}>Machine Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Machine Type"
        value={machineType}
        onChangeText={setMachineType}
      />

      <Text style={styles.label}>Machine Model</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Machine Model"
        value={machineModel}
        onChangeText={setMachineModel}
      />

      {/* Map for Location */}
      <Text style={styles.label}>Select Location (Tap on Map)</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 32.4922,
            longitude: 74.531,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={(e) => {
            const coords = e.nativeEvent.coordinate;
            setSelectedLocation(coords);
            setLocation(
              `Lat: ${coords.latitude.toFixed(
                5
              )}, Lng: ${coords.longitude.toFixed(5)}`
            );
          }}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
      </View>
      <Text style={styles.label}>Selected Coordinates</Text>
      <TextInput style={styles.input} value={location} editable={false} />

      <Text style={styles.label}>Availability Status</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <TouchableOpacity
          onPress={() => setAvailabilityStatus(!availabilityStatus)}
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: availabilityStatus ? "#FFB703" : "#E6E6E6",
            marginRight: 10,
          }}
        />
        <Text style={{ fontSize: 14, color: "#4B4B4B" }}>
          {availabilityStatus ? "Available" : "Unavailable"}
        </Text>
      </View>

      <Text style={styles.label}>Hourly Rate (USD)</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter Hourly Rate"
        value={hourlyRate}
        onChangeText={setHourlyRate}
      />

      <Text style={styles.label}>Machine Description</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        multiline
        placeholder="Enter Description"
        value={machineDescription}
        onChangeText={setMachineDescription}
      />

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
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B4B4B",
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#BFBFBF",
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
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
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 40,
  },
  cancelButton: {
    backgroundColor: "#E6E6E6",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#FFB703",
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
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#BFBFBF",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
