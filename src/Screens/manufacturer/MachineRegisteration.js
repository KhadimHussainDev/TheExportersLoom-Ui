import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import ImagePickerCarousel from "../../components/manufacturer/ImagePickerCarousel";
import { useNavigation } from "@react-navigation/native";
import { machineService } from "../../services/machineService";
import { MACHINE_TYPES } from "../../utils/contants/machineConstants";

export default function ManufacturerRegistration() {
  const navigation = useNavigation();

  // Machine Fields (matching backend schema)
  const [machineType, setMachineType] = useState("");
  const [machineModel, setMachineModel] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState(true);
  const [hourlyRate, setHourlyRate] = useState("");
  const [machineDescription, setMachineDescription] = useState("");
  const [machineImage, setMachineImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 32.4922,
    longitude: 74.531,
  });

  // Handle image selection from the ImagePickerCarousel
  const handleImageSelected = (imageUri) => {
    setMachineImage(imageUri);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Validate required fields
      if (!machineType || !machineModel || !location || !hourlyRate || !machineDescription || !machineImage) {
        Alert.alert("Error", "All machine fields are required");
        setIsLoading(false);
        return;
      }

      // Prepare the machine data according to backend DTO
      const machineData = {
        machine_type: machineType,
        machine_model: machineModel,
        location: location,
        availability_status: availabilityStatus,
        hourly_rate: parseFloat(hourlyRate),
        description: machineDescription,
        machine_image: machineImage, // This should be a URL or base64 string
      };

      // Use the machine service to register the machine
      const response = await machineService.registerMachine(machineData);

      if (response.success) {
        Alert.alert("Success", "Machine registered successfully!");
        // Navigate to machine management page
        navigation.navigate("ManufacturerMachines");
      } else {
        Alert.alert("Error", response.message || "Failed to register machine");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while registering the machine"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Register Machine</Text>
      
      <Text style={styles.label}>Machine Type *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={machineType}
          onValueChange={(itemValue) => setMachineType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Machine Type" value="" />
          {MACHINE_TYPES.map((type, index) => (
            <Picker.Item key={index} label={type.label} value={type.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Machine Model *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Machine Model"
        value={machineModel}
        onChangeText={setMachineModel}
      />

      {/* Map for Location */}
      <Text style={styles.label}>Select Location (Tap on Map) *</Text>
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
      <Text style={styles.label}>Selected Coordinates *</Text>
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

      <Text style={styles.label}>Hourly Rate (USD) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="Enter Hourly Rate"
        value={hourlyRate}
        onChangeText={setHourlyRate}
      />

      <Text style={styles.label}>Machine Description *</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        multiline
        placeholder="Enter Description"
        value={machineDescription}
        onChangeText={setMachineDescription}
      />

      <ImagePickerCarousel
        labelText="Machine Images *"
        buttonText="Select Machine Images"
        onImageSelected={handleImageSelected}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>{isLoading ? "Submitting..." : "Submit"}</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 24,
    textAlign: "center",
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
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
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
