import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const UserProfileInfo = ({
  name,
  email,
  phone,
  address,
  companyName,
  specialization,
  width,
  height,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      {companyName !== "Not specified" && (
        <View style={styles.infoRow}>
          <Icon name="business-outline" size={16} color="#555" />
          <Text style={styles.infoText}>{companyName}</Text>
        </View>
      )}

      {specialization !== "Not specified" && (
        <View style={styles.infoRow}>
          <Icon name="construct-outline" size={16} color="#555" />
          <Text style={styles.infoText}>{specialization}</Text>
        </View>
      )}

      <View style={styles.infoRow}>
        <Icon name="mail-outline" size={16} color="#555" />
        <Text style={styles.infoText}>{email}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="call-outline" size={16} color="#555" />
        <Text style={styles.infoText}>{phone}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="location-outline" size={16} color="#555" />
        <Text style={styles.infoText}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
    flex: 1,
  },
});

export default UserProfileInfo; 