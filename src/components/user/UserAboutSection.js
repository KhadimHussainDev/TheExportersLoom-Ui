import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserAboutSection = ({ aboutMe, width, height }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>{aboutMe}</Text>
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
  aboutContainer: {
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
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
  },
});

export default UserAboutSection; 