import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { streetwearMachines } from "../../utils/Data/businessData"; // Ensure correct path

const ServiceTypeSelection = ({
  serviceTypes,
  toggleCheckbox,
  otherServiceType,
  setOtherServiceType,
  selectedBusinessDomain,
  selectedMachines,
  setSelectedMachines,
}) => {
  // Toggle machine selection
  const toggleMachineCheckbox = (service, machine) => {
    setSelectedMachines((prevMachines) => ({
      ...prevMachines,
      [service]: {
        ...prevMachines[service],
        [machine]: !prevMachines[service]?.[machine] || false,
      },
    }));
  };

  return (
    <>
      <Text style={styles.label}>Service Type</Text>
      {Object.keys(serviceTypes).map((type) => (
        <View key={type} style={styles.checkboxContainer}>
          <Checkbox
            value={serviceTypes[type]}
            onValueChange={() => toggleCheckbox(type)}
            color={serviceTypes[type] ? "#013240" : undefined}
          />
          <Text style={styles.checkboxLabel}>{type}</Text>
        </View>
      ))}

      {/* "Other" Service Option */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={!!otherServiceType}
          onValueChange={() => setOtherServiceType(otherServiceType ? "" : " ")}
          color={otherServiceType ? "#013240" : undefined}
        />
        <Text style={styles.checkboxLabel}>Other</Text>
      </View>

      {otherServiceType !== "" && (
        <TextInput
          style={styles.input}
          placeholder="Enter Other Service"
          onChangeText={setOtherServiceType}
          value={otherServiceType}
        />
      )}

      {/* Machine Selection Section */}
      {selectedBusinessDomain === "Streetwear" &&
        Object.keys(serviceTypes).some((type) => serviceTypes[type]) && (
          <>
            <Text style={styles.label}>Select the Machines</Text>
            {Object.keys(serviceTypes).map(
              (service) =>
                serviceTypes[service] &&
                streetwearMachines[service] && (
                  <View key={service}>
                    <Text style={styles.subLabel}>{service} Machines</Text>
                    {streetwearMachines[service].map((machine) => (
                      <View key={machine} style={styles.checkboxContainer}>
                        <Checkbox
                          value={selectedMachines[service]?.[machine] || false}
                          onValueChange={() =>
                            toggleMachineCheckbox(service, machine)
                          }
                          color={
                            selectedMachines[service]?.[machine]
                              ? "#013240"
                              : undefined
                          }
                        />
                        <Text style={styles.checkboxLabel}>{machine}</Text>
                      </View>
                    ))}
                  </View>
                )
            )}
          </>
        )}
    </>
  );
};

export default ServiceTypeSelection;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B4B4B", // Darker text
    marginBottom: 6,
  },
  subLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B6B6B", // Medium gray
    marginTop: 8,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8", // Light background
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: "#4B4B4B",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BFBFBF",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
});
