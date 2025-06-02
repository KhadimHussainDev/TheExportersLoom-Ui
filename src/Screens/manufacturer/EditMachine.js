import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import ImagePickerCarousel from "../../components/manufacturer/ImagePickerCarousel";
import { useNavigation, useRoute } from "@react-navigation/native";
import { machineService } from "../../services/machineService";
import { MACHINE_TYPES } from "../../utils/contants/machineConstants";

const EditMachine = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { machine } = route.params;
  
  const [machineType, setMachineType] = useState(machine.machine_type || "");
  const [machineModel, setMachineModel] = useState(machine.machine_model || "");
  const [location, setLocation] = useState(machine.location || "");
  const [availabilityStatus, setAvailabilityStatus] = useState(
    machine.availability_status !== undefined ? machine.availability_status : true
  );
  const [hourlyRate, setHourlyRate] = useState(
    machine.hourly_rate ? machine.hourly_rate.toString() : ""
  );
  const [machineDescription, setMachineDescription] = useState(machine.description || "");
  const [machineImage, setMachineImage] = useState(machine.machine_image || "");
  const [isLoading, setIsLoading] = useState(false);

  // Parse the location string to get coordinates (assuming format is "Lat: XX.XXXXX, Lng: XX.XXXXX")
  const [selectedLocation, setSelectedLocation] = useState(() => {
    if (machine.location) {
      const locationMatch = machine.location.match(/Lat: ([-\d.]+), Lng: ([-\d.]+)/);
      if (locationMatch && locationMatch.length >= 3) {
        return {
          latitude: parseFloat(locationMatch[1]),
          longitude: parseFloat(locationMatch[2]),
        };
      }
    }
    return { latitude: 32.4922, longitude: 74.531 };
  });

  // Handle image selection from the ImagePickerCarousel
  const handleImageSelected = (imageUri) => {
    setMachineImage(imageUri);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      
      // Validate required fields
      if (!machineType || !machineModel || !location || !hourlyRate || !machineDescription || !machineImage) {
        Alert.alert("Error", "All fields are required");
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
        machine_image: machineImage,
      };

      // Use the machine service to update the machine
      const response = await machineService.updateMachine(machine.machine_id, machineData);

      if (response.success) {
        Alert.alert("Success", "Machine updated successfully!");
        navigation.navigate("ManufacturerMachines");
      } else {
        Alert.alert("Error", response.message || "Failed to update machine");
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred while updating the machine"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Edit Machine</Text>
      
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
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
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

      <Text style={styles.label}>Machine Image *</Text>
      <View style={styles.currentImageContainer}>
        <Text style={styles.currentImageText}>Current Image URL:</Text>
        <Text style={styles.imageUrl} numberOfLines={1}>
          {machineImage}
        </Text>
      </View>

      <ImagePickerCarousel
        labelText="Select New Machine Image"
        buttonText="Change Image"
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
          style={[styles.updateButton, isLoading && styles.disabledButton]}
          onPress={handleUpdate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Update Machine</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  currentImageContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFBFBF",
  },
  currentImageText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 4,
  },
  imageUrl: {
    fontSize: 12,
    color: "#4B4B4B",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  },
  updateButton: {
    flex: 2,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  buttonText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default EditMachine; 