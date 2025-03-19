import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserStatistics = ({ rating, reviewsCount, totalOrders, experienceYears }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{rating.toFixed(1)}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{reviewsCount}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{totalOrders}</Text>
        <Text style={styles.statLabel}>Orders</Text>
      </View>

      {experienceYears > 0 && (
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{experienceYears}</Text>
          <Text style={styles.statLabel}>Years Exp.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default UserStatistics; 