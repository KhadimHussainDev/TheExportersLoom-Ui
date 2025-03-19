import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const UserVerifications = ({ isEmailVerified, isPhoneVerified, width, height }) => {
  const verificationItems = [
    {
      icon: "person",
      verified: true,
      label: "Identity",
    },
    {
      icon: "call",
      verified: isPhoneVerified,
      label: "Phone",
    },
    {
      icon: "document-text",
      verified: true,
      label: "Documents",
    },
    {
      icon: "mail",
      verified: isEmailVerified,
      label: "Email",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifications</Text>
      <View style={styles.iconsContainer}>
        {verificationItems.map((item, index) => (
          <View key={index} style={styles.verificationItem}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.verified ? "#4CAF50" : "#e0e0e0" },
              ]}
            >
              <Icon
                name={item.icon}
                size={18}
                color={item.verified ? "#fff" : "#999"}
              />
            </View>
            <Text style={styles.iconLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  verificationItem: {
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  iconLabel: {
    fontSize: 12,
    color: "#666",
  },
});

export default UserVerifications; 