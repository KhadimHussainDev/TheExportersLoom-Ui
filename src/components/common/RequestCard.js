import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // For message icon
import Icon from "react-native-vector-icons/Ionicons";

const RequestCard = ({ module, request }) => {
  return (
    <View style={styles.card}>
      {/* Module Image */}
      <Image source={module.image} style={styles.image} />

      {/* Request Details */}
      <View style={styles.textContainer}>
        <Text style={styles.exporterName}>{request.exporterName}</Text>
        <Text style={styles.moduleName}>{module.middleText}</Text>
      </View>

      {/* Messages Icon with Notification Count */}
      <View style={styles.messageContainer}>
        <TouchableOpacity>
          <Icon name="chatbox-ellipses" size={24} color="#013240" />
          {request.numberOfMessages > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{request.numberOfMessages}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.timeAgo}>{request.timeAgoRequestReceived}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  exporterName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moduleName: {
    fontSize: 14,
    color: "#666",
  },
  messageContainer: {
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default RequestCard;
